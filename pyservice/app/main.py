import json
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.agents.cv_extractor.cv_extractor_agent import call_agent
from app.logger_config import logger  # 👈 Import logger setup

from jinja2 import Environment, FileSystemLoader
import pdfkit

from app.scrsper.indeed_scraper import scrape_google_job_results

app = FastAPI(
    title="Book Analysis API",
    description="Provides analytical functions for books",
    version="1.0.0",
)


class BookAnalysisRequest(BaseModel):
    title: str
    author: str
    published_date: Optional[datetime] = None
    isbn: Optional[str] = None


class GoogleJobScrapeRequest(BaseModel):
    keyword: str
    location: str
    num_search_pages: int = 1


@app.post("/api/ask")
async def ask(query: str):
    response = await call_agent(query)
    json_response = json.loads(response.strip("```json").strip("```").strip())
    return {"response": json_response}


@app.get("/api/health")
async def health_check():
    logger.info("Health check")
    return {"status": "healthy", "service": "book-analysis"}


# Generate CV
@app.post("/api/generate_cv")
async def generate_cv(template_type: str = "classic"):

    template_type = template_type.lower()
    with open(f"app/generate_cv/templates/{template_type}/cv_data.json") as f:
        data = json.load(f)
    env = Environment(
        loader=FileSystemLoader(f"app/generate_cv/templates/{template_type}")
    )
    template = env.get_template("cv_template.html")  # template
    html_out = template.render(**data)  # Render HTML with data
    print("html_out", html_out)
    with open("app/generate_cv/cv_output.html", "w") as f:
        f.write(html_out)  # Save the rendered HTML

    # Convert HTML to PDF (using wkhtmltopdf / pdfkit)
    # pdfkit.from_file('app/generate_cv/cv_output.html', 'app/generate_cv/cv_output.pdf')

    return {"message": "CV generated successfully"}


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
