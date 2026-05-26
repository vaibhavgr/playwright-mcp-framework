import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage"; // 1. Import BasePage

export class CartPage extends BasePage {

    readonly addtoCartBtn: Locator;
    readonly cartTableRows: Locator;
    readonly cartPrices: Locator;
    readonly cartQuantities: Locator;
    readonly cartTotalPrices: Locator;
    readonly cartBtn: Locator
    readonly cartProducts: Locator;
    readonly removeProductBtn: Locator
    readonly emptyCartMessage: Locator



    constructor(page: Page) {
        super(page);

        this.addtoCartBtn = page.getByText('Add to cart', { exact: true })
        this.cartTableRows = page.locator('#cart_info_table tbody tr');
        this.cartPrices = page.locator('#cart_info_table tbody tr .cart_price p');
        this.cartQuantities = page.locator('#cart_info_table tbody tr .cart_quantity button');
        this.cartTotalPrices = page.locator('#cart_info_table tbody tr .cart_total p.cart_total_price');
        this.cartBtn = page.locator('.shop-menu a[href="/view_cart"]');
        this.cartProducts = page.locator('#cart_info_table tbody tr .cart_description a')
        this.removeProductBtn = page.locator('.cart_quantity_delete')
        this.emptyCartMessage = page.getByText('Cart is empty!', { exact: true });


    }
    //add product top cart
    async addToCart() {
        await this.addtoCartBtn.click()
    }

    async clickCartBtn() {
        await this.cartBtn.click()
    }

    async verifyProductsAddedToCart(expectedCount: number) {
        await expect(this.cartTableRows).toHaveCount(expectedCount);
    }

    async getCartProductsDetails() {
        const rowCount = await this.cartTableRows.count()
        const productsData = [];

        for (let i = 0; i < rowCount; i++) {
            const productName = await this.cartProducts.nth(i).innerText();
            const priceText = await this.cartPrices.nth(i).innerText();
            const quantityText = await this.cartQuantities.nth(i).innerText();
            const totalText = await this.cartTotalPrices.nth(i).innerText();

            // Har product ki details ko ek object banakar array me push kar rahe hain
            productsData.push({
                name: productName,
                price: priceText,
                quantity: quantityText,
                total: totalText
            });
        }
        return productsData;
    }

    async verifyProductPricesQuantityAndTotal() {
        const productsData = await this.getCartProductsDetails();

        for (const product of productsData) {
            // Remove 'Rs. ' and convert to number (e.g. "Rs. 500" -> 500)
            const price = parseInt(product.price.replace(/[^0-9]/g, ''), 10);
            const quantity = parseInt(product.quantity, 10);
            const total = parseInt(product.total.replace(/[^0-9]/g, ''), 10);

            // Verify mathematics: Price * Quantity = Total
            expect(price * quantity).toBe(total);
        }
    }

    async verifyExactQuantity(expectedQuantity: string) {
        await expect(this.cartQuantities.first()).toHaveText(expectedQuantity);
    }

    async removeProductfromCart() {
        const productsData = await this.getCartProductsDetails();
        await expect(this.cartTableRows).toHaveCount(productsData.length);
        const rowCount = productsData.length;
        for (let i = 0; i < rowCount; i++) {
            await this.removeProductBtn.first().click()
            await expect(this.cartTableRows).toHaveCount(rowCount - i - 1);
        }
    }
    async verifyCartIsEmpty() {
        await expect(this.emptyCartMessage).toBeVisible();
        await this.page.pause()
    }
}