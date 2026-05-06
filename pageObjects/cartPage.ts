import { Locator, Page, expect } from "@playwright/test";

export class CartPage{
 readonly page : Page;
 readonly addtoCartBtn : Locator;
 readonly cartTableRows : Locator;
 readonly cartPrices : Locator;
 readonly cartQuantities : Locator;
 readonly cartTotalPrices : Locator;


    constructor (page : Page){

    this.page = page;
    this.addtoCartBtn = page.getByText('Add to cart', { exact: true })
    this.cartTableRows = page.locator('#cart_info_table tbody tr');
    this.cartPrices = page.locator('#cart_info_table tbody tr .cart_price p');
    this.cartQuantities = page.locator('#cart_info_table tbody tr .cart_quantity button');
    this.cartTotalPrices = page.locator('#cart_info_table tbody tr .cart_total p.cart_total_price');

}
    //add product top cart
    async addToCart(){
        await this.addtoCartBtn.click()
    }

    async verifyProductsAddedToCart(expectedCount: number) {
        await expect(this.cartTableRows).toHaveCount(expectedCount);
    }

    async verifyProductPricesQuantityAndTotal() {
        const rowCount = await this.cartTableRows.count();
        for (let i = 0; i < rowCount; i++) {
            await expect(this.cartPrices.nth(i)).toBeVisible();
            await expect(this.cartQuantities.nth(i)).toBeVisible();
            await expect(this.cartTotalPrices.nth(i)).toBeVisible();
            
            const priceText = await this.cartPrices.nth(i).textContent();
            const quantityText = await this.cartQuantities.nth(i).textContent();
            const totalText = await this.cartTotalPrices.nth(i).textContent();
            
            if (priceText && quantityText && totalText) {
                const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
                const quantity = parseInt(quantityText, 10);
                const total = parseInt(totalText.replace(/[^0-9]/g, ''), 10);
                expect(price * quantity).toBe(total);
            }
        }
    }
}