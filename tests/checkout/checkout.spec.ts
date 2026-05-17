import { expect } from '@playwright/test';
import { test } from '../fixtures/baseTest';
import { getNewUserData } from '../../data/userData';
import { testCardData } from '../../data/paymentData';


test.describe('Checkout Flow', () => {

    test('Test Case 14: Register while Checkout with Invoice Verification', async ({ page, paymentPage, homePage, productPage, cartPage, checkoutPage, signUpLoginPage }) => {
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
        const grandTotal = await checkoutPage.verifyOrderDetails(cartProductsData);

        // --- 15.add description in comment text area and click 'Place Order'
        await checkoutPage.enterComments();

        await checkoutPage.clickPlaceOrder();
        const cardData = testCardData();
        await paymentPage.fillPaymentDetails(cardData)
        await paymentPage.verifySuccessOrdertext();
        await paymentPage.downloadAndVerifyInvoice(newUser.firstName, newUser.lastName, grandTotal);

        // --- 19. Click 'Delete Account' button ---
        await homePage.navigateToDeletePage();

        // --- 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button ---
        await homePage.verifyAccountDeleted();
        await homePage.clickContinue();

    });

    test('Test Case 15: Place Order: Register before Checkout', async ({ page, paymentPage, homePage, productPage, cartPage, checkoutPage, signUpLoginPage }) => {
        await homePage.goto();

        // --- 4. Click 'Signup / Login' button ---
        await signUpLoginPage.goto();

        // --- 5. Fill all details in Signup and create account ---
        const newUser = getNewUserData();
        await signUpLoginPage.verifySignupVisible();
        await signUpLoginPage.registerUser(newUser.firstName, newUser.email);
        await signUpLoginPage.fillAccountDetails(newUser);

        // --- 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button ---
        await signUpLoginPage.verifyAccountCreated();
        await signUpLoginPage.clickContinue();

        // --- 7. Verify 'Logged in as username' at top ---
        await expect(homePage.loggedInUser).toBeVisible();

        // --- 8. Add products to cart ---
        await productPage.addRandomProductsToCart();

        // Note: addRandomProductsToCart already navigates to the cart page, 
        // so we can extract products data directly.
        const cartProductsData = await cartPage.getCartProductsDetails();

        // --- 11. Click Proceed To Checkout ---
        await checkoutPage.clickProceedtoCheckoutBtn();

        // --- 12. Verify Address Details and Review Your Order ---
        await checkoutPage.verifyDeliveryAdd(newUser);
        const grandTotal = await checkoutPage.verifyOrderDetails(cartProductsData);

        // --- 13. Enter description in comment text area and click 'Place Order' ---
        await checkoutPage.enterComments();
        await checkoutPage.clickPlaceOrder();

        // --- 14 & 15. Enter payment details and click 'Pay and Confirm Order' ---
        const cardData = testCardData();
        await paymentPage.fillPaymentDetails(cardData);

        // --- 16. Verify success message ---
        await paymentPage.verifySuccessOrdertext();
        await paymentPage.downloadAndVerifyInvoice(newUser.firstName, newUser.lastName, grandTotal);

        // --- 17. Click 'Delete Account' button ---
        await homePage.navigateToDeletePage();

        // --- 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button ---
        await homePage.verifyAccountDeleted();
        await homePage.clickContinue();
    });

    test.only('Test Case 16: Place Order: Login before Checkout', async ({ page, paymentPage, homePage, productPage, cartPage, checkoutPage, signUpLoginPage, loginPage }) => {
        // --- Pre-condition: Create a user and logout so we can login during the test ---
        const newUser = getNewUserData();
        await homePage.goto();
        await signUpLoginPage.goto();
        await signUpLoginPage.registerUser(newUser.firstName, newUser.email);
        await signUpLoginPage.fillAccountDetails(newUser);
        await signUpLoginPage.clickContinue();
        await homePage.logoutheaderBtn();

        // --- Actual Flow for Test Case 16 ---
        // --- 4. Click 'Signup / Login' button ---
        await loginPage.goto();

        // --- 5. Fill email, password and click 'Login' button ---
        await loginPage.loginValidUser(newUser.email, newUser.password);
        await loginPage.loginBtnClick();
        // --- 6. Verify 'Logged in as username' at top ---
        await expect(homePage.loggedInUser).toBeVisible();

        // --- 7. Add products to cart ---
        await productPage.addRandomProductsToCart();

        // Extract products data directly from cart
        const cartProductsData = await cartPage.getCartProductsDetails();

        // --- 10. Click Proceed To Checkout ---
        await checkoutPage.clickProceedtoCheckoutBtn();

        // --- 11. Verify Address Details and Review Your Order ---
        await checkoutPage.verifyDeliveryAdd(newUser);
        const grandTotal = await checkoutPage.verifyOrderDetails(cartProductsData);

        // --- 12. Enter description in comment text area and click 'Place Order' ---
        await checkoutPage.enterComments();
        await checkoutPage.clickPlaceOrder();

        // --- 13 & 14. Enter payment details and click 'Pay and Confirm Order' ---
        const cardData = testCardData();
        await paymentPage.fillPaymentDetails(cardData);

        // --- 15. Verify success message ---
        await paymentPage.verifySuccessOrdertext();
        await paymentPage.downloadAndVerifyInvoice(newUser.firstName, newUser.lastName, grandTotal);
    });
});
