import asyncio
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async


def get_google_company_careers(keyword="dotnet developer", location="Dubai"):
    async def run():
        query = f"""
        {keyword} {location} 
        -site:indeed.com 
        -site:linkedin.com 
        -site:naukrigulf.com
        -site:crossover.com
        -site:wellfound.com
        -site:glassdoor.com
        """  # Exclude Indeed and LinkedIn
        search_url = f'https://www.google.com/search?q={query.replace(" ", "+")}'
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False)
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                locale="en-US",
            )
            page = await context.new_page()
            await stealth_async(page)
            print(f"[+] Navigating to Google Search URL: {search_url}&hl=en")

            # Force Google to use English
            en_url = search_url + "&hl=en"
            await page.set_extra_http_headers({"Accept-Language": "en-US,en;q=0.9"})
            await page.goto(en_url, timeout=150000)

            # Wait for search results to load
            print("[+] Waiting for search results to load...")
            await page.wait_for_selector("div#search", timeout=60000)
            print("[+] Search results loaded")

            # Take a screenshot for debugging
            await page.screenshot(path="google_search.png")
            print("[+] Saved screenshot to google_search.png")

            # Try different selectors to find result links
            print("[+] Trying to find result links...")
            elements1 = await page.query_selector_all(
                'a[href^="https://"], a[href^="http://"]'
            )
            print(f"[+] Found {len(elements1)} direct links")

            all_links = []

            # Process direct links first
            for el in elements1:
                try:
                    href = await el.get_attribute("href")
                    if href:
                        # Skip any URL containing "google" anywhere in the domain
                        if "google" in href.lower():
                            continue

                        # Only include http or https links
                        if href.startswith("https://") or href.startswith("http://"):
                            all_links.append(href)
                except Exception as e:
                    print(f"Error getting href: {str(e)}")
                    continue

            # Initialize a list to track successful pages
            successful_pages = []

            # Process up to 20 links
            for i, link in enumerate(all_links[:20]):
                try:
                    # go to the link and scrape the page
                    async with async_playwright() as p:
                        browser = await p.chromium.launch(headless=False)
                        context = await browser.new_context(
                            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                            locale="en-US",
                        )
                        page = await context.new_page()
                        await stealth_async(page)
                        print(f"[+] Navigating to {link}")

                        try:
                            # Use a shorter timeout for navigation
                            await page.goto(link, timeout=2000)

                            try:
                                # Wait for the page to load, but don't fail if selector not found
                                print("[+] Waiting for page to load...")
                                await page.wait_for_selector("div#search", timeout=2000)
                                print("[+] Page loaded")
                            except Exception as e:
                                print(
                                    f"[!] Selector not found, but page loaded: {str(e)}"
                                )

                            # Take a screenshot even if selector wasn't found
                            await page.screenshot(path=f"page_{i+1}.png")
                            print(f"[+] Saved screenshot to page_{i+1}.png")

                            # Add to successful pages
                            successful_pages.append(link)

                        except Exception as page_error:
                            print(f"[!] Failed to load page {link}: {str(page_error)}")

                except Exception as e:
                    print(f"[!] Error processing link {link}: {str(e)}")
                    continue

            print(
                f"[+] Successfully processed {len(successful_pages)} out of {min(20, len(all_links))} links"
            )
            await browser.close()

    asyncio.run(run())


if __name__ == "__main__":
    get_google_company_careers()
