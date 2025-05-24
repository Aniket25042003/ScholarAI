from .AcademicAgent import run_all_tasks, run_chat

def run_research_flow(
    topic: str,
    num_papers: int = 10,
    citation_style: str = "MLA"
) -> dict:
    return run_all_tasks(topic=topic, num_papers=num_papers, citation_style=citation_style)
