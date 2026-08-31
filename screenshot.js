const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  await page.goto(`file://${process.cwd()}/index.html`);

  // Wait for the slide content to load
  await page.waitForSelector('.project-showcase');

  // Navigate directly to the element to capture
  const element = await page.$('.project-showcase');
  if (element) {
    await element.screenshot({ path: 'verification_screenshot_showcase.png' });
    console.log('Screenshot captured successfully as verification_screenshot_showcase.png');
  } else {
    console.log('Could not find .project-showcase section.');
  }

  await browser.close();
})();
