import { test } from '../fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('Products Tests', () => {

  test('Test Case 12: Login & Add Products in Cart', async ({ page, homePage, productPage, loginPage }) => {
    // 1. Launch browser 
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.goto();

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveTitle(/Automation Exercise/);

    //Login 
    //await loginPage.loginvalidUser(ValidUserDetails.email, ValidUserDetails.password)
    await loginPage.loginBtnClick()

    // 4. Click on 'Products' button
    await productPage.navigateToProductPage();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL(/\/products/);
    await productPage.verifyallProductsText();

    // 6. The products list is visible
    await productPage.listofProducts();

    // 7. Click on 'View Product' of first product
    await productPage.clickViewProductFirst();

    // 8. User is landed to product detail page
    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await productPage.verifyProductDetails();
  });


 
  

});