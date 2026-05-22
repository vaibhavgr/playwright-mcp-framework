import { expect, Locator, Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class ProductPage {
    readonly page: Page;

    // --- Locators: General ---
    readonly allproductText: Locator;
    readonly productsList: Locator;
    readonly singleProducts: Locator;
    readonly categoryTitle: Locator;
    readonly productHeader: Locator;
    readonly brandsHeading: Locator;
    readonly brandList: Locator;

    // --- Locators: Search ---
    readonly searchProductfill: Locator;
    readonly searchProductIcon: Locator;
    readonly searchProductListName: Locator;
    readonly searchedProductsHeader: Locator;

    // --- Locators: Product Details ---
    readonly viewProductFirstLink: Locator;
    readonly viewProductCartBtn: Locator;
    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;

    // --- Locators: Cart Operations ---
    readonly firstProductHover: Locator;
    readonly firstProductAddToCart: Locator;
    readonly secondProductHover: Locator;
    readonly secondProductAddToCart: Locator;
    readonly continueShoppingBtn: Locator;
    readonly viewCartLinkModal: Locator;
    readonly quantityInput: Locator;
    readonly addToCartBtn: Locator;


    constructor(page: Page) {
        this.page = page;

        // General
        this.allproductText = page.getByText('All Products', { exact: true });
        this.productsList = page.locator('.features_items');
        this.singleProducts = page.locator('.features_items .col-sm-4:visible');
        this.categoryTitle = page.locator('h2.title.text-center');
        this.productHeader = page.getByRole('link', { name: 'Products' });

        // Search
        this.searchProductfill = page.locator('#search_product');
        this.searchProductIcon = page.locator('#submit_search');
        this.searchProductListName = page.locator('.productinfo p');
        this.searchedProductsHeader = page.getByRole('heading', { name: 'Searched Products' });

        // Product Details
        this.viewProductFirstLink = page.getByRole('link', { name: 'View Product' }).first();
        this.viewProductCartBtn = page.getByRole('link', { name: 'View Product' });
        this.productName = page.locator('.product-information h2');
        this.productCategory = page.locator('.product-information p').filter({ hasText: 'Category:' });
        this.productPrice = page.locator('.product-information span span');
        this.productAvailability = page.locator('.product-information p').filter({ hasText: 'Availability:' });
        this.productCondition = page.locator('.product-information p').filter({ hasText: 'Condition:' });
        this.productBrand = page.locator('.product-information p').filter({ hasText: 'Brand:' });

        // Cart Operations
        this.firstProductHover = page.locator('.single-products').first();
        this.firstProductAddToCart = page.locator('.single-products').first().locator('.add-to-cart').first();
        this.secondProductHover = page.locator('.single-products').nth(1);
        this.secondProductAddToCart = page.locator('.single-products').nth(1).locator('.add-to-cart').first();
        this.continueShoppingBtn = page.getByText('Continue Shopping', { exact: true });
        this.viewCartLinkModal = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
        this.quantityInput = page.locator('#quantity');
        this.addToCartBtn = page.locator('button.cart');

        //Brnad Heading 
        this.brandsHeading = page.getByRole('heading', { name: 'Brands' });
        this.brandList = page.locator('.brands-name ul.nav-pills li a')

    }

    // ==========================================
    // Navigation Methods
    // ==========================================

    async goto() {
        await this.page.goto('/products');
    }

    async navigateToProductPage() {
        await this.productHeader.click();
    }

    // ==========================================
    // Actions & Cart Operations
    // ==========================================

    async listofProducts() {
        const print = await this.productsList.textContent();
    }

    async clickViewProductFirst() {
        await this.viewProductFirstLink.click();
    }

    async searchProduct(productName: string) {
        await this.searchProductfill.fill(productName);
        await this.searchProductIcon.click();
        const name = await this.searchProductListName.allTextContents();
        console.log(name);
    }

    async clickContinueShopping() {
        await this.continueShoppingBtn.click();
    }

    async clickViewCartModal() {
        await this.viewCartLinkModal.click();
    }

    async increaseQuantity(quantity: string) {
        await this.quantityInput.fill(quantity);
    }

    async clickAddToCartBtn() {
        await this.addToCartBtn.click();
    }

    async addRandomProductsToCart() {
        const totalProducts = await this.singleProducts.count();
        const tempLimit = 5;
        const maxPossible = Math.min(totalProducts, tempLimit);
        const randomCount = faker.number.int({ min: 1, max: maxPossible });

        console.log(`random add ${randomCount} products`);

        // create indices [0,1,2,...]
        const indices = [];
        for (let i = 0; i < totalProducts; i++) {
            indices.push(i);
        }

        // shuffle & pick unique indices
        const shuffled = indices.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, randomCount);

        for (let i = 0; i < selected.length; i++) {
            const index = selected[i];
            console.log(`Clicking index: ${index}`);

            const product = this.singleProducts.nth(index);

            // optional but makes it more stable
            await product.scrollIntoViewIfNeeded();

            const addToCartBtn = product.locator('.add-to-cart').first();
            await addToCartBtn.click();

            console.log(`Product at index ${index} added to cart.`);

            if (i < selected.length - 1) {
                await this.continueShoppingBtn.click();
                await this.continueShoppingBtn.waitFor({ state: 'hidden' });
            } else {
                await Promise.all([
                    this.page.waitForURL('**/view_cart'),
                    this.viewCartLinkModal.click()
                ]);
            }
        }

        return randomCount;
    }
    async verifyBrandsVisible() {
        await expect(this.brandsHeading).toBeVisible();
        const count = await this.brandList.count();
        for (let i = 0; i < count; i++) {
            const brandElement = this.brandList.nth(i);
            await expect(brandElement).toBeVisible();
             const brandName = await brandElement.textContent();
            //console lagya h brand name ke liye hatana hai 
            console.log(brandName);
        }
    }
    async clickBrand(brandName: string) {
        await this.brandList.filter({ hasText: brandName }).first().click();
    }

    async verifyBrandPage(brandName: string) {
        await expect(this.page).toHaveURL(new RegExp(`/brand_products/${brandName}`, 'i'));
        await expect(this.categoryTitle).toBeVisible();
        await expect(this.categoryTitle).toHaveText(new RegExp(`Brand - ${brandName} Products`, 'i'));
        const count = await this.singleProducts.count();
        expect(count).toBeGreaterThan(0);
    }

    // ==========================================
    // Assertions
    // ==========================================

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

    async verifyCategoryTitle(expectedTitle: string) {
        await expect(this.categoryTitle).toBeVisible();
        await expect(this.categoryTitle).toHaveText(expectedTitle);
    }
}