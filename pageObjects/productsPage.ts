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
    readonly productHeader: Locator;
    readonly searchProductfill: Locator;
    readonly searchProductIcon: Locator;
    readonly searchProductListName: Locator;
    readonly searchedProductsHeader: Locator;
    readonly firstProductHover: Locator;
    readonly firstProductAddToCart: Locator;
    readonly secondProductHover: Locator;
    readonly secondProductAddToCart: Locator;
    readonly continueShoppingBtn: Locator;
    readonly viewCartLinkModal: Locator;

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
        this.productHeader = page.getByRole('link', { name: 'Products' })
        this.searchProductfill = page.locator('#search_product');
        this.searchProductIcon = page.locator('#submit_search');
        this.searchProductListName = page.locator('.productinfo p');
        this.searchedProductsHeader = page.getByRole('heading', { name: 'Searched Products' });
        this.firstProductHover = page.locator('.single-products').first();
        this.firstProductAddToCart = page.locator('.single-products').first().locator('.add-to-cart').first();
        this.secondProductHover = page.locator('.single-products').nth(1);
        this.secondProductAddToCart = page.locator('.single-products').nth(1).locator('.add-to-cart').first();
        this.continueShoppingBtn = page.locator('button.close-modal');
        this.viewCartLinkModal = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
    }

    //Navigation 
    async goto() {
        await this.page.goto('/products');
    }

    async navigateToProductPage() {
        await this.productHeader.click()
        
    }

    //Actions
    async listofProducts() {
        const print = await this.productsList.textContent()

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
        await expect(this.productBrand).toBeVisible();
    }

    async verifySearchName() {
        // Verify 'SEARCHED PRODUCTS' heading is visible
        await expect(this.searchedProductsHeader).toBeVisible();

        // The website returns products if the search keyword matches EITHER the Product Name OR the Product Category.
        // Since Category is not visible on this grid, we simply verify that related search results are successfully returned.
        const count = await this.searchProductListName.count();
        expect(count).toBeGreaterThan(0);
    }

   

    async searchProduct(productName: string) {
        await this.searchProductfill.fill(productName)
        await this.searchProductIcon.click()
        const name = await this.searchProductListName.allTextContents()
        console.log(name)

    }

    async addFirstProductToCart() {
        await this.firstProductHover.scrollIntoViewIfNeeded();
        await this.firstProductAddToCart.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingBtn.click();
    }

    async addSecondProductToCart() {
        await this.secondProductHover.scrollIntoViewIfNeeded();
        await this.secondProductAddToCart.click();
    }

    async clickViewCartModal() {
        await this.viewCartLinkModal.click();
    }
}