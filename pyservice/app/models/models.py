from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BookAnalysisRequest(BaseModel):
    """
    Request model for book analysis.
    """
    title: str
    author: str
    published_date: Optional[datetime] = None
    isbn: Optional[str] = None


class GoogleJobScrapeRequest(BaseModel):
    """
    Request model for Google job scraping.
    """
    keyword: str
    location: str
    num_search_pages: int = 1
