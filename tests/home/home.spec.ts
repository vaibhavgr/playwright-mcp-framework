import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('Home Page Scrolling Tests', () => {

    test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down', async ({ homePage }) => {
        // 1. Launch browser & Navigate to url
        await homePage.goto();

        // 2. Verify that home page is visible successfully
        await expect(homePage.page).toHaveTitle(/Automation Exercise/);

        // 3. Scroll down page to bottom
        await homePage.scrollToBottom();

        // 4. Verify 'SUBSCRIPTION' is visible
        await homePage.verifySubscriptionVisible();

        // 5. Click on the arrow button at bottom right side to scroll up
        await homePage.clickScrollUp();

        // 6. Verify that page is scrolled up and text is visible
        await homePage.verifyCarouselHeaderVisible();
    });

    test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down', async ({ homePage }) => {
        // 1. Launch browser & Navigate to url
        await homePage.goto();

        // 2. Verify that home page is visible successfully
        await expect(homePage.page).toHaveTitle(/Automation Exercise/);

        // 3. Scroll down page to bottom
        await homePage.scrollToBottom();

        // 4. Verify 'SUBSCRIPTION' is visible
        await homePage.verifySubscriptionVisible();

        // 5. Scroll up page to top
        await homePage.scrollToTop();

        // 6. Verify that page is scrolled up and text is visible
        await homePage.verifyCarouselHeaderVisible();
    });

});
