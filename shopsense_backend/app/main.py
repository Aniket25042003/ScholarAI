from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import ResearchRequest, ResearchResponse
from app.agent import run_agents

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Dev only; restrict in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/research", response_model=ResearchResponse)
def research_product(request: ResearchRequest):
    try:
        result = run_agents(request.product_idea)
        return result
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
