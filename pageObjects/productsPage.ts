import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly allproductText: Locator;
    readonly productsList: Locator;
    readonly viewProductFirstLink: Locator;
    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;

    constructor(page: Page) {
        this.page = page;

        this.allproductText = page.getByText('All Products', { exact: true });
        this.productsList = page.locator('.features_items');
        this.viewProductFirstLink = page.getByRole('link', { name: 'View Product' }).first();
        this.productName = page.locator('.product-information h2');
        this.productCategory = page.locator('.product-information p').filter({ hasText: 'Category:' });
        this.productPrice = page.locator('.product-information span span');
        this.productAvailability = page.locator('.product-information p').filter({ hasText: 'Availability:' });
        this.productCondition = page.locator('.product-information p').filter({ hasText: 'Condition:' });
        this.productBrand = page.locator('.product-information p').filter({ hasText: 'Brand:' });
    }

    //Navigation 
    async goto() {
        await this.page.goto('/products');
    }

    //Actions
    async listofProducts() {
        const print = await this.productsList.textContent()
        console.log(print)
    }

    async clickViewProductFirst() {
        await this.viewProductFirstLink.click();
    }

    // Assertions
    async verifyallProductsText() {
        await expect(this.allproductText).toBeVisible();
        await expect(this.allproductText).toHaveText('All Products');
    }

    async verifyProductDetails() {
        await expect(this.page).toHaveURL(/\/product_details\/\d+/);
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();//yeh change karunga alag alag karunga .. 
    }
}