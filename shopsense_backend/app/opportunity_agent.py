# opportunity_agent.py

import os
import json
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, LLM

load_dotenv()
GOOGLE_KEY = os.getenv("GOOGLE_API_KEY")

# Reuse your Gemini LLM for strategy tasks
llm = LLM(
    model="gemini/gemini-2.0-flash",
    provider="google",
    api_key=GOOGLE_KEY,
    temperature=0.3,  # lower temperature for more consistent output
)

def identify_opportunities(market_data, consumer_sentiment):
    """
    Uses a CrewAI Agent to produce:
      - gapAnalysis: list of 3–4 bullet strings
      - recommendationSummary: a single concise paragraph
    """
    # 1) Pack inputs
    context = {
        "products": market_data,
        "consumerSentiment": consumer_sentiment
    }
    context_json = json.dumps(context, indent=2)

    # 2) Build strategist agent
    strategist = Agent(
        role="Market Strategist",
        goal="Identify clear market gaps and provide strategic recommendations.",
        backstory="A seasoned consultant turning data into actionable insights.",
        tools=[],  # no external tools needed here
        llm=llm,
        verbose=False
    )

    # 3) Define the Task with explicit JSON schema
    prompt = (
        f"You are a market strategist. Here is your input data:\n\n{context_json}\n\n"
        "Please output **only** a single JSON object with exactly two keys:\n"
        "  1) \"gapAnalysis\": an array of exactly 3–4 strings, each describing a specific market gap or product opportunity.\n"
        "  2) \"recommendationSummary\": one concise paragraph of strategic recommendations addressing those gaps.\n\n"
        "**Do not** include any additional keys, comments, or formatting—just the JSON object."
    )
    task = Task(
        description=prompt,
        expected_output=(
            '{"gapAnalysis":["gap1","gap2","gap3","gap4"],'
            '"recommendationSummary":"Your paragraph here."}'
        ),
        agent=strategist,
        llm=llm
    )

    # 4) Run the Crew
    crew = Crew(
        agents=[strategist],
        tasks=[task],
        planning=False,
        verbose=False
    )
    result = crew.kickoff()

    # 5) Extract raw output and log for debugging
    raw = result.text if hasattr(result, "text") else str(result)
    print("🤖 [OpportunityAgent] raw LLM output:\n", raw)

    # 6) Attempt to isolate the JSON block
    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end != -1 and end > start:
        json_blob = raw[start:end+1]
    else:
        print("⚠️ [OpportunityAgent] Could not find JSON braces in output; using entire raw.")
        json_blob = raw

    print("🔍 [OpportunityAgent] JSON blob to parse:\n", json_blob)

    # 7) Parse JSON
    try:
        parsed = json.loads(json_blob)
        gaps = parsed.get("gapAnalysis", [])
        rec = parsed.get("recommendationSummary", "")
        print("✅ [OpportunityAgent] parsed JSON successfully:")
        print("   gapAnalysis:", gaps)
        print("   recommendationSummary:", rec)
    except Exception as e:
        print("❌ [OpportunityAgent] JSON parsing failed:", e)
        gaps, rec = [], ""

    return gaps, rec
