import { expect } from '@playwright/test';
import { test } from '@fixtures/baseTest';
import { testCardData } from '@data/paymentData';
import { getexistingUser } from '@data/userData';

test.describe('Authenticated Checkout Flow', () => {

    test('Place Order as Logged In User (Direct Checkout)', async ({ page, paymentPage, homePage, productPage, cartPage, checkoutPage }) => {
        // Direct home page par navigation - login step bypass!
        await homePage.goto();

        // Check logged in user header directly
        const existingUser = getexistingUser();
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(existingUser.name);

        // Standard Add to cart and checkout flow
        await productPage.addRandomProductsToCart();
        const cartProductsData = await cartPage.getCartProductsDetails();
        await checkoutPage.clickProceedtoCheckoutBtn();

        const grandTotal = await checkoutPage.verifyOrderDetails(cartProductsData);
        await checkoutPage.enterComments();
        await checkoutPage.clickPlaceOrder();

        const cardData = testCardData();
        await paymentPage.fillPaymentDetails(cardData);
        await paymentPage.verifySuccessOrdertext();
    });
});
