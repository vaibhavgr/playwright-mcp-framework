import { CartPage } from '@pageObjects/cartPage';
import { test } from '@fixtures/baseTest';
import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

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

  test("Test Case 13: Verify Product quantity in Cart", async ({ homePage, productPage, cartPage }) => {
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

  test('Test Case 17 : Remove Product from Cart', async ({ homePage, productPage, cartPage }) => {

    await homePage.goto();
    await productPage.addRandomProductsToCart();
    await cartPage.removeProductfromCart();
    await cartPage.verifyCartIsEmpty()

  })

  test.only('Test Case 22: Add to cart from Recommended items', async ({ homePage, productPage, cartPage }) => {
    await allure.description('This test verifies that users can successfully scroll down to recommended items and add them to the cart.');
    await allure.severity('critical');
    await allure.owner('Vaibhav');
    await allure.tags('Cart', 'Recommended', 'Regression');
    await allure.feature('Cart Management');
    await allure.story('Add from Recommended Section');
    await homePage.goto();
    await homePage.scrollToRecommendedItems();
    await homePage.verifyRecommendedHeadingVisible();

    const addedProduct = await homePage.addFirstRecommendedProductToCart();
    await productPage.clickViewCartModal();

    await cartPage.verifyProductInCart(addedProduct);
  });

});