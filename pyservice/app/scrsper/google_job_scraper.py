import asyncio
import os
import json
from urllib.parse import urlparse
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async
import datetime
import logging

# Configure logging to file in logs folder with current date
log_date = datetime.datetime.now().strftime("%Y%m%d")
log_filename = os.path.join(os.getcwd(), "logs", f"Scraper_{log_date}.log")
os.makedirs(os.path.dirname(log_filename), exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(log_filename, encoding="utf-8"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)

# --- Configuration ---
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
)
EXCLUDED_DOMAINS = [
    "indeed.com",
    "linkedin.com",
    "naukrigulf.com",
    "crossover.com",
    "wellfound.com",
    "glassdoor.com",
    "bayt.com",
    "jobsora.com",
    "careerjet.com",
    "naukri.com",
    "gulftalent.com",
]
SEARCH_PAGE_PATTERNS = ["search", "query", "results", "jobs/search", "vacancies/search"]
JOB_PATH_KEYWORDS = [
    "job",
    "careers",
    "vacancy",
    "position",
    "opportunity",
    "opening",
    "recruit",
    "employment",
]
JOB_DESCRIPTION_KEYWORDS = [
    "responsibilities",
    "requirements",
    "qualifications",
    "job description",
    "skills",
    "what you'll do",
    "what you will do",
    "who you are",
    "about the role",
    "about you",
    "your profile",
    "experience",
    "position summary",
    "duties",
    "tasks",
    "desired skills",
    "must have",
    "nice to have",
]


# --- Utility Functions ---
def build_google_query(keyword, location):
    exclusions = " ".join([f"-site:{domain}" for domain in EXCLUDED_DOMAINS])
    return f"{keyword} {location} {exclusions}"


def is_likely_job_page(url):
    parsed = urlparse(url)
    path_and_query = (parsed.path + parsed.query).lower()
    if any(pattern in path_and_query for pattern in SEARCH_PAGE_PATTERNS):
        logger.warning(f"Skipping {url}: Looks like a search/search result page.")
        return False
    if not any(keyword in parsed.path.lower() for keyword in JOB_PATH_KEYWORDS):
        logger.warning(f"Skipping {url}: URL does not look like a job/career page.")
        return False
    return True


def get_domain_folder(base_dir, url):
    domain = urlparse(url).netloc.replace(":", "_")
    folder = os.path.join(base_dir, domain)
    os.makedirs(folder, exist_ok=True)
    return folder


# --- Playwright Scraping Functions ---
async def fetch_google_search_results(page, query, num_pages, output_dir):
    links = []
    for i in range(num_pages):
        start = i * 10
        search_url = f'https://www.google.com/search?q={query.replace(" ", "+")}&hl=en&start={start}'
        logger.info(f"Navigating to Google Search URL: {search_url}")
        await page.set_extra_http_headers({"Accept-Language": "en-US,en;q=0.9"})
        await page.goto(search_url, timeout=150000)
        logger.info(f"Search results loaded (page {i+1})")
        os.makedirs(output_dir, exist_ok=True)
        anchors = await page.query_selector_all(
            'a[href^="https://"], a[href^="http://"]'
        )
        logger.info(f"Found {len(anchors)} direct links on page {i+1}")
        for anchor in anchors:
            try:
                href = await anchor.get_attribute("href")
                if (
                    href
                    and "google" not in href.lower()
                    and (href.startswith("https://") or href.startswith("http://"))
                ):
                    links.append(href)
            except Exception as e:
                logger.error(f"Error getting href: {str(e)}")
                continue
    return links


async def save_job_page_content(url, output_dir):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(user_agent=USER_AGENT, locale="en-US")
        page = await context.new_page()
        await stealth_async(page)
        logger.info(f"Navigating to {url}")
        try:
            await page.goto(url, timeout=6000)
            text_content = await page.evaluate("document.body.innerText")
            text_lower = text_content.lower()
            has_job_desc = any(
                keyword in text_lower for keyword in JOB_DESCRIPTION_KEYWORDS
            )
            screenshot_path = os.path.join(output_dir, "page.png")
            await page.screenshot(path=screenshot_path)
            text_path = os.path.join(output_dir, "page.txt")
            with open(text_path, "w", encoding="utf-8") as f:
                f.write(text_content)
            await browser.close()
            return has_job_desc, text_content
        except Exception as page_error:
            logger.error(f"Failed to load page {url}: {str(page_error)}")
            await browser.close()
            return False, None


# --- Main Orchestration Function ---
async def scrape_google_job_results(keyword, location, num_search_pages):
    query = build_google_query(keyword, location)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    session_dir = os.path.join(os.getcwd(), "websites", f"search_{timestamp}")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(user_agent=USER_AGENT, locale="en-US")
        page = await context.new_page()
        await stealth_async(page)
        links = await fetch_google_search_results(
            page, query, num_search_pages, session_dir
        )
        await browser.close()
    results = []
    for idx, url in enumerate(links[:20]):
        if not is_likely_job_page(url):
            results.append(
                {
                    "url": url,
                    "text": None,
                    "note": "No job description structure in URL",
                }
            )
            continue
        domain_folder = get_domain_folder(session_dir, url)
        has_job_desc, text_content = await save_job_page_content(url, domain_folder)
        if has_job_desc:
            results.append({"url": url, "text": text_content})
        else:
            results.append(
                {
                    "url": url,
                    "text": text_content,
                    "note": "No job description found in page content",
                }
            )
    logger.info(
        f"Successfully processed {sum(1 for r in results if r.get('text'))} out of {min(20, len(links))} links"
    )
    with open(
        os.path.join(session_dir, "master_pages.json"), "w", encoding="utf-8"
    ) as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    logger.info(
        f"Master JSON file saved at {os.path.join(session_dir, 'master_pages.json')}"
    )
    return results


# --- Entry Point ---
def run_google_job_scraper(
    keyword="dotnet developer", location="Dubai", num_search_pages=1
):
    asyncio.run(scrape_google_job_results(keyword, location, num_search_pages))


if __name__ == "__main__":
    run_google_job_scraper()
