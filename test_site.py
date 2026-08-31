import http.server
import socketserver
import threading
from playwright.sync_api import sync_playwright
import time

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

def serve():
    httpd.serve_forever()

thread = threading.Thread(target=serve)
thread.daemon = True
thread.start()

time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f"http://localhost:{PORT}")
    time.sleep(2) # wait for animations
    page.screenshot(path="screenshot_local.png", full_page=True)

    # check js logs
    page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

    browser.close()

httpd.shutdown()
