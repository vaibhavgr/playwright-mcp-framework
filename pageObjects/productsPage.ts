import { expect, Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

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
    readonly singleProducts: Locator;
    readonly viewProductCartBtn: Locator;
    readonly quantityInput: Locator;
    readonly addToCartBtn: Locator;

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
        this.continueShoppingBtn = page.getByText('Continue Shopping', { exact: true })
        this.viewCartLinkModal = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
        this.singleProducts = page.locator('.features_items .col-sm-4:visible');
        this.viewProductCartBtn = page.getByRole('link', { name: 'View Product' });
        this.quantityInput = page.locator('#quantity');
        this.addToCartBtn = page.locator('button.cart');
        
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

    async clickContinueShopping() {
        await this.continueShoppingBtn.click();
    }

    async clickViewCartModal() {
        await this.viewCartLinkModal.click();  
    }
    
    async addRandomProductsToCart() {
        const totalProducts = await this.singleProducts.count();
        const tempLimit = 5;
        const maxPossible = Math.min(totalProducts, tempLimit)
        const randomCount = faker.number.int({ min: 1, max: maxPossible });
        console.log(`random add ${randomCount} products`);

        // create indices [0,1,2,...]
        const indices = [];
        for (let i = 0; i < totalProducts; i++) {
            indices.push(i);
        }

        // shuffle
        const shuffled = indices.sort(() => 0.5 - Math.random());

        // pick unique indices
        const selected = shuffled.slice(0, randomCount);

        for (let i = 0; i < selected.length; i++) {
            const index = selected[i];
            console.log(`Clicking index: ${index}`);

            const product = this.singleProducts.nth(index);

            // optional but makes it more stable
            await product.scrollIntoViewIfNeeded();
            // await product.hover(); // removed to avoid pointer interception

            const addToCartBtn = product.locator('.add-to-cart').first();

            await addToCartBtn.click();

            console.log(`Product at index ${index} added to cart.`);

            if (i < selected.length - 1) {
                await this.continueShoppingBtn.click();
                await this.continueShoppingBtn.waitFor({ state: 'hidden' });
            } else {
                await this.viewCartLinkModal.click();
            }
        }

        return randomCount;
    }


    async increaseQuantity(quantity: string) {
        await this.quantityInput.fill(quantity);
    }

    async clickAddToCartBtn() {
        await this.addToCartBtn.click();
    }
}