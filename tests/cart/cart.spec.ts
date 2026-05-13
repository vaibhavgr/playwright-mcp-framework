import { test } from '../fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('Products Tests', () => {

  test('Test Case 12: Add Products in Cart', async ({ homePage, productPage, cartPage }) => {
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

  test("Test Case 13: Verify Product quantity in Cart", async({homePage, productPage, cartPage})=> {
    // 1. Launch browser 
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    await homePage.goto();

    // 4. Click 'View Product' for any product on home page
    await productPage.clickViewProductFirst();

    // 5. Verify product detail is opened
    await productPage.verifyProductDetails();

    // 6. Increase quantity to 4
    await productPage.increaseQuantity('4');

    // 7. Click 'Add to cart' button
    await productPage.clickAddToCartBtn();

    // 8. Click 'View Cart' button
    await productPage.clickViewCartModal();

    // 9. Verify that product is displayed in cart page with exact quantity
    await cartPage.verifyExactQuantity('4');
  }) 

});