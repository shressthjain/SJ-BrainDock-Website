import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Collect console messages
const logs = [];
page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', err => logs.push(`[PAGE ERROR] ${err.message}`));

await page.goto('http://localhost:8766/developers.html?v=5', { waitUntil: 'networkidle' });

// Check font loading status
const fontInfo = await page.evaluate(() => {
  const fonts = [];
  document.fonts.forEach(f => fonts.push(`${f.family} ${f.weight} ${f.status}`));
  const interLoaded = document.fonts.check('800 48px "Inter"');
  return { fonts, interLoaded, dpr: window.devicePixelRatio };
});

console.log('Device Pixel Ratio:', fontInfo.dpr);
console.log('Inter 800 loaded:', fontInfo.interLoaded);
console.log('All fonts:', fontInfo.fonts.join('\n  '));

// Check canvas dimensions
const canvasInfo = await page.evaluate(() => {
  const c = document.getElementById('binaryCanvas');
  if (!c) return 'Canvas not found';
  return {
    cssWidth: c.style.width,
    cssHeight: c.style.height, 
    pixelWidth: c.width,
    pixelHeight: c.height,
    parentWidth: c.parentElement.clientWidth
  };
});
console.log('Canvas:', JSON.stringify(canvasInfo, null, 2));

// Wait for animation
await page.waitForTimeout(5000);

// Take screenshot
await page.screenshot({ path: 'screenshot-v5-test.png' });

// Print console messages
if (logs.length) {
  console.log('\nConsole messages:');
  logs.forEach(l => console.log(' ', l));
} else {
  console.log('\nNo console messages.');
}

await browser.close();
