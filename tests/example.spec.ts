import { test, expect } from '@playwright/test';

test('Open Automation Exercise website', async ({ page }) => {
  // Navigate to the base URL configured for the current environment (e.g. dev, qa)
  await page.goto('/');

  // Verify that the page has loaded properly by checking the title
  await expect(page).toHaveTitle(/Automation Exercise/);
});
