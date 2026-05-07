import { test } from '../fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('Products Tests', () => {

  test.only('Test Case 12: Add Products in Cart', async ({ homePage, productPage, cartPage }) => {
    // 1. Launch browser 
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.goto();

    // 4. Click 'Products' button
    await productPage.navigateToProductPage();

    // 5-8. Add multiple products and navigate to Cart
    const addedProductsCount = await productPage.addRandomProductsToCart();

    // 9. Verify exactly that many products are added to Cart
    await cartPage.verifyProductsAddedToCart(addedProductsCount);

    // 10. Verify their prices, quantity and total price
    await cartPage.verifyProductPricesQuantityAndTotal();
  });

});