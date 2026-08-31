from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"http://localhost:8000")

    # Let's check bounding box of the active image
    active_img = page.locator('.project-image-slide.active img')
    box = active_img.bounding_box()
    print(f"Active image bounding box: {box}")

    browser.close()
