from pydantic import BaseModel
from typing import Optional

class ResearchRequest(BaseModel):
    topic: str
    num_papers: Optional[int] = 5
    citation_style: Optional[str] = "APA"

class ResearchResponse(BaseModel):
    researchReport: str

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    reply: str
