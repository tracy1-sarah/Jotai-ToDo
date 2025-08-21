import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // You can add any global setup here, like:
  // - Setting up test data
  // - Clearing localStorage
  // - Setting up authentication tokens
  
  await browser.close();
}

export default globalSetup;
