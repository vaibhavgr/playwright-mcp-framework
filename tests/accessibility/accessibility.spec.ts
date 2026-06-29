import AxeBuilder from '@axe-core/playwright';
import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';
import { Logger } from '@utils/Logger';


test.describe('WCAG Accessibility Verification', () => {
    test('TC_A11Y_01: Verify Home Page Accessibility Compliance', async ({ page, axeBuilder }) => {
        // Step 1: Page Navigation
        await test.step('Navigate to Home Page', async () => {
            await page.goto('/');
            Logger.info('Navigated to Home Page.');
        });
        // Step 2: Run Axe Scan
        await test.step('Analyze Page Accessibility using AxeBuilder', async () => {


            const results = await axeBuilder
                .withTags(['wcag2a', 'wcag2aa'])
                .disableRules(['color-contrast', 'link-name', 'button-name'])
                .analyze();

            const violations = results.violations;
            Logger.info(`Accessibility Scan Completed. Total Issues Found: ${violations.length}`);

            if (violations.length > 0) {
                // Playwright HTML report mein violations list attach kar rahe hain
                await test.info().attach('accessibility-violations', {
                    body: JSON.stringify(violations, null, 2),
                    contentType: 'application/json'
                });
            }

            // Assert karenge ki violations empty honi chahiye
            expect(violations).toEqual([]);
        });
    });
});
