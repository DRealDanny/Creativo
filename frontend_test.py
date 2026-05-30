from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Check work page
        page.goto('http://localhost:5173/work')
        time.sleep(2)
        page.screenshot(path='work.png')

        # Check web development case study
        page.goto('http://localhost:5173/case-study/tazverde-website')
        time.sleep(2)
        page.screenshot(path='web_case_study.png')

        browser.close()

if __name__ == '__main__':
    run()
