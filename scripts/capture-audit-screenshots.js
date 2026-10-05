import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  const outDir = path.resolve(__dirname, '../docs/audit-screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('1. Capturing Skip Link focused state on Home...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '01-skip-link-focused.png') });

  console.log('2. Capturing Primary Nav focus...');
  await page.keyboard.press('Tab'); // navigates to brand link
  await page.keyboard.press('Tab'); // navigates to Case Study
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '02-nav-keyboard-focus.png') });

  console.log('3. Capturing Lead Chat starter prompt focus...');
  await page.goto('http://localhost:3000/demo/lead-chat', { waitUntil: 'networkidle' });
  // Skip link
  await page.keyboard.press('Tab');
  // Brand
  await page.keyboard.press('Tab');
  // Nav links
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  // First starter prompt
  await page.keyboard.press('Tab');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '03-starter-prompt-focus.png') });

  console.log('4. Capturing Chat input focus...');
  await page.locator('#chat-message-input').focus();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '04-chat-input-focus.png') });

  console.log('5. Capturing Active AI response with Stop button focus...');
  await page.locator('#chat-message-input').fill('Tell me about your product capabilities');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(350);
  const stopBtn = page.locator('button[aria-label="Stop generating response"]');
  if (await stopBtn.isVisible()) {
    await stopBtn.focus();
  }
  await page.screenshot({ path: path.join(outDir, '05-ai-streaming-stop-focused.png') });

  console.log('6. Capturing Lighthouse baseline report score...');
  const homeBaselinePath = 'file:///' + path.resolve(__dirname, '../baseline-home.report.html').replace(/\\/g, '/');
  await page.goto(homeBaselinePath, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const gaugeWrapper = page.locator('.lh-scores-wrapper');
  if (await gaugeWrapper.isVisible()) {
    await gaugeWrapper.screenshot({ path: path.join(outDir, '06-baseline-scores-gauge.png') });
  } else {
    await page.screenshot({ path: path.join(outDir, '06-baseline-scores-full.png'), clip: { x: 0, y: 0, width: 1280, height: 400 } });
  }

  console.log('7. Capturing Lighthouse post-fix report score...');
  const homePostFixPath = 'file:///' + path.resolve(__dirname, '../post-fix-home.report.html').replace(/\\/g, '/');
  await page.goto(homePostFixPath, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const gaugeWrapperPost = page.locator('.lh-scores-wrapper');
  if (await gaugeWrapperPost.isVisible()) {
    await gaugeWrapperPost.screenshot({ path: path.join(outDir, '07-postfix-scores-gauge.png') });
  } else {
    await page.screenshot({ path: path.join(outDir, '07-postfix-scores-full.png'), clip: { x: 0, y: 0, width: 1280, height: 400 } });
  }

  console.log('Screenshots captured successfully.');
  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
