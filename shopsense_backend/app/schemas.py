from pydantic import BaseModel
from typing import List, Dict, Any

class ResearchRequest(BaseModel):
    product_idea: str

class ResearchResponse(BaseModel):
    productName: str
    competitorOverview: List[Dict[str, Any]]
    pricingAnalysis: Dict[str, Any]
    consumerSentiment: Dict[str, List[str]]
    gapAnalysis: List[str]
    recommendationSummary: str
