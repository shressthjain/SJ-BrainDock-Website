import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:8765/developers.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(6000);

// Clip just the banner area (below header, above hero)
const banner = await page.locator('.binary-banner').boundingBox();
if (banner) {
  await page.screenshot({
    path: 'screenshot-banner-zoom.png',
    clip: { x: banner.x, y: banner.y, width: banner.width, height: banner.height }
  });
  console.log('Banner box:', JSON.stringify(banner));
} else {
  console.log('Banner element not found!');
}

await browser.close();
