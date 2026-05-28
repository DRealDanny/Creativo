from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:5173/about')
    page.screenshot(path='/home/jules/verification/about_page2.png', full_page=True)
    browser.close()
