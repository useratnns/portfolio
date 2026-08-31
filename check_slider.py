from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000")

    # Wait for images to load
    page.wait_for_timeout(2000)

    # Get bounding box of the active image
    active_img = page.query_selector('.project-image-slide.active img')
    if active_img:
        box = active_img.bounding_box()
        print(f"Active image bounding box: {box}")
    else:
        print("No active image found")

    slider = page.query_selector('.project-image-slider')
    if slider:
        box = slider.bounding_box()
        print(f"Slider bounding box: {box}")
    else:
        print("No slider found")

    browser.close()
