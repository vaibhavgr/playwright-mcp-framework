import { expect } from '@playwright/test';
import { test } from '../fixtures/baseTest';
import { getNewUserData } from '../../data/userData';
import { testCardData } from '../../data/paymentData';


test.describe('Checkout Flow', () => {

    test.only('Test Case 14: Register while Checkout with Invoice Verification', async ({ page, paymentPage, homePage, productPage, cartPage, checkoutPage, signUpLoginPage }) => {
        await homePage.goto();

        // Add products and go to cart
        await productPage.addRandomProductsToCart()

        // Proceed to Checkout -> triggers login/register modal
        await checkoutPage.clickProceedtoCheckoutBtn()
        await checkoutPage.clickcheckoutModalRegisterLoginBtn()

        // --- 9. Fill all details in Signup and create account ---
        const newUser = getNewUserData();

        await signUpLoginPage.verifySignupVisible();
        await signUpLoginPage.registerUser(newUser.firstName, newUser.email);
        await signUpLoginPage.fillAccountDetails(newUser);

        // --- 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button ---
        await signUpLoginPage.verifyAccountCreated();
        await signUpLoginPage.clickContinue();

        // --- 11. Verify 'Logged in as username' at top ---
        await expect(homePage.loggedInUser).toBeVisible();

        // --- 12. Click 'Cart' button to go back to cart ---
        await Promise.all([
            page.waitForURL('**/view_cart'),
            cartPage.clickCartBtn()
        ]);

        // Extract products data from cart before proceeding to checkout
        const cartProductsData = await cartPage.getCartProductsDetails();

        // --- 13. Click 'Proceed To Checkout' button ---
        await Promise.all([
            checkoutPage.clickProceedtoCheckoutBtn()
        ]);

        // --- 14.verify address details have data and deatils are same as the time of account detail section  
        await checkoutPage.verifyDeliveryAdd(newUser);

        // --- 14.verify order details at checkoutpage
        await checkoutPage.verifyOrderDetails(cartProductsData);


        // --- 15.add description in comment text area and click 'Place Order'
        await checkoutPage.enterComments();
        await checkoutPage.clickPlaceOrder();
        const cardData = testCardData();
        await paymentPage.fillPaymentDetails(cardData)
        await paymentPage.verifySuccessOrdertext();
        await paymentPage.downloadAndVerifyInvoice();





    });
});
