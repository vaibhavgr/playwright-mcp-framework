import { test } from '../fixtures/baseTest';
import { expect } from '@playwright/test';

test.describe('Products Tests', () => {

  test('Test Case 8: Verify All Products and product detail page', async ({ page, homePage, productPage }) => {
    // 1. Launch browser 
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.goto();

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveTitle(/Automation Exercise/);

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


  test('Test Case 9 : Search Product @SearchProduct', async ({ page, homePage, productPage }) => {
    // 1. Launch browser 
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.goto();

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveTitle(/Automation Exercise/);

    // 4. Click on 'Products' button  
    await productPage.navigateToProductPage();

    //Search Products 
    const searchproduct: string = "Top"
    await productPage.searchProduct(searchproduct)

    await productPage.verifySearchName()

  })
  test('Test Case 18 : View Category Products', async ({ page, homePage, productPage }) => {
    // 1. Launch browser & 2. Navigate to url
    await homePage.goto();

    // 3. Verify that categories are visible on left side bar
    await homePage.verifyCategoriesVisible();

    // 4. Click on 'Women' category & 5. Click on any sub-category link under 'Women' category
    await homePage.clickCategory('Women', 'Dress');

    // 6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
    await productPage.verifyCategoryTitle('Women - Dress Products');

    // 7. On left side bar, click on any sub-category link of 'Men' category
    await homePage.clickCategory('Men', 'Tshirts');

    // 8. Verify that user is navigated to that category page
    await productPage.verifyCategoryTitle('Men - Tshirts Products');

  })
  test('Test Case 19 : : View & Cart Brand Products', async ({ page, homePage, productPage }) => {
    // 1. Launch browser & 2. Navigate to url
    await homePage.goto();

    // 3. Click on 'Products' Section
    await productPage.navigateToProductPage();

    // 4. Verify that Brands are visible on left side bar
    await productPage.verifyBrandsVisible();

    // 5. Click on any brand name
    await productPage.clickBrand('Polo');

    // 6. Verify that user is navigated to brand page and brand products are displayed
    await productPage.verifyBrandPage('Polo');

    // 7. On left side bar, click on any other brand link
    await productPage.clickBrand('H&M');

    // 8. Verify that user is navigated to that brand page and can see products
    await productPage.verifyBrandPage('H&M');
  })

  test.only('Test Case 20: Search Products and Verify Cart After Login', async ({ page, homePage, productPage, cartPage, loginPage }) => {
    // 1. Launch browser & 2. Navigate to url
    await homePage.goto();

    // 3. Click on 'Products' Section
    await productPage.navigateToProductPage();


    // 4. Enter product name in search input and click search button
    const searchKeyword = 'Top';
    await productPage.searchProduct(searchKeyword);
    // 5. Verify 'SEARCHED PRODUCTS' is visible and related products are visible
    await productPage.verifySearchName();
    const searchProductNames = await productPage.searchProductListName.allTextContents();
    console.log(searchProductNames)

    

    await productPage.addAllSearchedProductsToCart()



  })


});