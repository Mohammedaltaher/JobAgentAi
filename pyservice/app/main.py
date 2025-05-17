import json
import re
from fastapi import FastAPI, HTTPException, Query
import sys
import asyncio
from app.agents.cv_extractor.cv_extractor_agent import call_agent
from app.logger_config import logger  # 👈 Import logger setup
from app.generate_cv.generate_cv import generate_cv  # Import the generate_cv function
from app.models import BookAnalysisRequest, GoogleJobScrapeRequest  # Import models from models package

from app.scrsper.google_job_scraper import scrape_google_job_results

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

app = FastAPI(
    title="Job Agent AI API",
    description="Provides job search, CV generation, and career assistance services",
    version="1.0.0",
)

@app.post("/api/ask")
async def ask(query: str):
    response = await call_agent(query)
    print("Response:", response)
    match = re.search(r"```json\s*(\{.*\})\s*```", response, re.DOTALL)
    if match:
        json_str = match.group(1)
        json_response = json.loads(json_str)
        return {"response": json_response}
    else:
        raise HTTPException(status_code=400, detail="No JSON found in response.")


# Generate CV
@app.post("/api/generate_cv")
async def generate_cv_endpoint(template_type: str = "classic"):
    """
    Generate a CV using the specified template type.
    
    Args:
        template_type (str): The type of template to use (e.g., 'classic', 'modren', 'test').
        
    Returns:
        dict: A message indicating whether the CV was generated successfully.
    """
    return await generate_cv(template_type)


@app.post("/api/scrape_google_jobs")
async def scrape_google_jobs(request: GoogleJobScrapeRequest):
    """
    Scrape Google job results for a given keyword and location.
    """
    try:
        results = await scrape_google_job_results(
            request.keyword, request.location, request.num_search_pages
        )
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
