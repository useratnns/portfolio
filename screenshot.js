const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1800 });
  await page.goto('http://localhost:8000/index.html');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();
})();
