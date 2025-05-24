from dotenv import load_dotenv
load_dotenv()

import os
import json
from crewai import Agent, Task, Crew, Process, LLM
from crewai_tools import SerperDevTool
from mem0 import MemoryClient
from crewai.memory import LongTermMemory, ShortTermMemory, EntityMemory
from crewai.memory.storage.ltm_sqlite_storage import LTMSQLiteStorage
from crewai.memory.storage.rag_storage import RAGStorage

# --- ENVIRONMENT ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
MEM0_API_KEY   = os.getenv("MEM0_API_KEY")
MEM0_USER_ID   = os.getenv("MEM0_USER_ID", "academic_research_agent")

client = MemoryClient(api_key=MEM0_API_KEY)

# --- LLM SETUP ---
llm = LLM(
    model="gpt-4.1",
    api_key=OPENAI_API_KEY,
    temperature=0.6,
    max_tokens=1000
)

# --- TOOLS ---
serper_tool = SerperDevTool(api_key=SERPER_API_KEY)

# --- AGENTS ---
literature_agent = Agent(
    role="Academic Researcher",
    goal="Fetch and summarize academic literature",
    backstory="Expert in mining scholarly articles",
    tools=[serper_tool],
    llm=llm
)
writer_agent = Agent(
    role="Research Writer",
    goal="Compose a coherent academic research report combining literature and key insights",
    backstory="Skilled scientific communicator",
    tools=[],
    llm=llm
)
chat_agent = Agent(
    role="Chat Assistant",
    goal="Answer user follow-up questions based on research context",
    backstory="Context-aware academic helper",
    tools=[],
    llm=llm
)

# --- CONTEXT FOR CHAT ---
_last_report = ""
def set_last_report(report: str):
    global _last_report
    _last_report = report

def get_last_report() -> str:
    global _last_report
    return _last_report

# --- HELPERS ---
def _unwrap(res):
    return res[0] if isinstance(res, tuple) else res

def _get_text(res):
    if hasattr(res, "text"):
        return res.text
    if isinstance(res, dict) and "text" in res:
        return res["text"]
    return str(res)

# --- MAIN RESEARCH WORKFLOW ---
def run_all_tasks(topic: str, num_papers: int, citation_style: str) -> dict:
    lit_task = Task(
        description=(
            f"Search site:scholar.google.com for the top {num_papers} most-cited papers on "
            f"'{topic}' and return a JSON array of objects with keys "
            "['title','authors','year','summary','doi']."
        ),
        expected_output="JSON array of papers",
        agent=literature_agent,
        llm=llm
    )
    crew1 = Crew(
        agents=[literature_agent],
        tasks=[lit_task],
        process=Process.sequential,
        verbose=False
    )
    lit_out = crew1.kickoff(inputs={"question": topic})
    raw_lit = _get_text(_unwrap(lit_out))

    try:
        literature = json.loads(raw_lit)
    except Exception:
        literature = []

    # --- Write research report ---
    prompt = (
        "Here is a JSON array of literature summaries:\n"
        f"{json.dumps(literature, indent=2)}\n\n"
        "Write a polished and on to point research report with sections: "
        "What the research is about, What the research found, What methodology was used, What were the conclusions, What are the future enhancements or gaps.\n"
        "Return exactly: Research Report: <report>.\n\n"
    )
    write_task = Task(
        description=prompt,
        expected_output="{'researchReport': ''}",
        agent=writer_agent,
        llm=llm
    )
    crew2 = Crew(
        agents=[writer_agent],
        tasks=[write_task],
        process=Process.sequential,
        memory=True,
        memory_config={"provider": "mem0", "config": {"user_id": MEM0_USER_ID, "agent_id": MEM0_USER_ID}},
        verbose=False
    )
    write_out = crew2.kickoff(inputs={})
    raw_write = _get_text(_unwrap(write_out))

    try:
        researchReport = json.loads(raw_write).get("researchReport", "")
    except Exception:
        researchReport = raw_write

    set_last_report(researchReport)

    # --- CORRECT FORMAT FOR MEM0: messages ONLY ---
    client.add(
        messages=[
            {"role": "user", "content": topic},
            {"role": "assistant", "content": raw_lit},
            {"role": "assistant", "content": raw_write}
        ],
        user_id=MEM0_USER_ID,
        agent_id=MEM0_USER_ID
    )

    return {"researchReport": researchReport}

# --- CHAT WORKFLOW ---
def run_chat(question: str) -> str:
    last_report = get_last_report()
    if last_report:
        chat_context = (
            "You are an academic assistant. Use the following research report as context when answering the user's follow-up question. "
            "Be specific and reference the details in the report when possible.\n\n"
            f"--- Research Report ---\n{last_report}\n\n"
            "User question: " + question
        )
    else:
        chat_context = (
            "No research report is available yet. Answer the user's question as best you can.\n\n"
            "User question: " + question
        )

    task = Task(
        description=chat_context,
        expected_output="Chat reply",
        agent=chat_agent,
        llm=llm
    )
    crew = Crew(
        agents=[chat_agent],
        tasks=[task],
        process=Process.sequential,
        memory=True,
        memory_config={"provider": "mem0", "config": {"user_id": MEM0_USER_ID, "agent_id": MEM0_USER_ID}},
        verbose=False
    )
    out = crew.kickoff(inputs={})
    reply = _get_text(_unwrap(out))

    # --- CORRECT FORMAT FOR MEM0: messages ONLY ---
    client.add(
        messages=[
            {"role": "user", "content": question},
            {"role": "assistant", "content": reply}
        ],
        user_id=MEM0_USER_ID,
        agent_id=MEM0_USER_ID
    )
    return reply
