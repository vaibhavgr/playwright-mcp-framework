import { test } from '../fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('Products Tests', () => {

  test('Test Case 12: Add Products in Cart', async ({ homePage, productPage, cartPage }) => {
    // 1. Launch browser 
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.goto();

    // 4. Click 'Products' button
    await productPage.navigateToProductPage();

    // 5. Hover over first product and click 'Add to cart'
    await productPage.addFirstProductToCart();

    // 6. Click 'Continue Shopping' button
    await productPage.clickContinueShopping();

    // 7. Hover over second product and click 'Add to cart'
    await productPage.addSecondProductToCart();

    // 8. Click 'View Cart' button
    await productPage.clickViewCartModal();

    // 9. Verify both products are added to Cart
    await cartPage.verifyProductsAddedToCart(2);

    // 10. Verify their prices, quantity and total price
    await cartPage.verifyProductPricesQuantityAndTotal();
  });

});