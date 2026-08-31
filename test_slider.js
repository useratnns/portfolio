const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/index.html');
  await page.waitForTimeout(1000);

  const activeImage1 = await page.locator('.project-image-slide.active img').getAttribute('src');
  console.log('Slide 1 image:', activeImage1);

  await page.click('.next-btn');
  await page.waitForTimeout(500);

  const activeImage2 = await page.locator('.project-image-slide.active img').getAttribute('src');
  console.log('Slide 2 image:', activeImage2);

  await browser.close();
})();
