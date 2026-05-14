import { Locator, Page, expect } from "@playwright/test";
import { User } from "../data/userData";

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutModalRegisterLoginBtn: Locator;
    readonly cartTableRows: Locator;
    readonly cartProducts: Locator;
    readonly cartPrices: Locator;
    readonly cartQuantities: Locator;
    readonly cartTotalPrices: Locator;
    readonly proceedtoCheckoutBtn: Locator;
    readonly deliveryAddressLines: Locator;
    readonly commentBoxText : Locator
    readonly placeOrderBtn : Locator
    

    constructor(page: Page) {
        this.page = page;
        this.proceedtoCheckoutBtn = page.getByText('Proceed To Checkout');
        this.checkoutModalRegisterLoginBtn = page.getByRole('link', { name: 'Register / Login' });
        this.deliveryAddressLines = page.locator('#address_delivery li');
        
        // Locators for Review Order Table
        // We use :has(.cart_description) to only select actual product rows and ignore the "Total Amount" row at the bottom
        this.cartTableRows = page.locator('table tbody tr:has(.cart_description)');
        this.cartProducts = page.locator('table tbody tr:has(.cart_description) .cart_description a');
        this.cartPrices = page.locator('table tbody tr:has(.cart_description) .cart_price p');
        this.cartQuantities = page.locator('table tbody tr:has(.cart_description) .cart_quantity button');
        this.cartTotalPrices = page.locator('table tbody tr:has(.cart_description) .cart_total p.cart_total_price');
        this.commentBoxText = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' })
    }

    // Actions
    async clickProceedtoCheckoutBtn() {
        await this.proceedtoCheckoutBtn.click()
    }

    async clickcheckoutModalRegisterLoginBtn() {
        await this.checkoutModalRegisterLoginBtn.click()
    }

    async enterComments(){
        await this.commentBoxText.fill("Please send my order soon. Thanks ")
       
    }

    async clickPlaceOrder(){

        await this.placeOrderBtn.click()
    }
    // assertions 
    async verifyDeliveryAdd(user: User) {
        // at the timje of account creation we fetch and put all details in one array 
        const deliveryaddress = await this.deliveryAddressLines.allTextContents()

        const cityStateZip = deliveryaddress[5].replace(/\s+/g, ' ').trim();

        console.log('--- EXPECTED (User Data Inputted) ---');
        console.log(`Name: ${user.firstName} ${user.lastName}`);
        console.log(`Company: ${user.company}`);
        console.log(`Address: ${user.address}`);
        console.log(`City/State/Zip: ${user.city} ${user.state} ${user.zipcode}`);
        console.log(`Country: India`);
        console.log(`Mobile: ${user.mobile}`);

        console.log('\n--- ACTUAL (From Checkout Page) ---');
        console.log(`Name: ${deliveryaddress[1]}`);
        console.log(`Company: ${deliveryaddress[2]}`);
        console.log(`Address: ${deliveryaddress[3]}`);
        console.log(`City/State/Zip: ${cityStateZip}`);
        console.log(`Country: ${deliveryaddress[6]}`);
        console.log(`Mobile: ${deliveryaddress[7]}`);
        console.log('-----------------------------------\n');

        expect(deliveryaddress[1]).toContain(`${user.firstName} ${user.lastName}`);
        expect(deliveryaddress[2]).toContain(user.company);
        expect(deliveryaddress[3]).toContain(user.address);
        expect(cityStateZip).toContain(`${user.city} ${user.state} ${user.zipcode}`);
        expect(deliveryaddress[6]).toContain('India'); // or user.country
        expect(deliveryaddress[7]).toContain(user.mobile);
    }

    async verifyOrderDetails(cartProductsData: any[]) {
        // We must use 'toHaveCount' instead of '.count()' because 'toHaveCount' will wait for the page to load!
        await expect(this.cartTableRows).toHaveCount(cartProductsData.length);
        const rowCount = cartProductsData.length;

        for (let i = 0; i < rowCount; i++) {
            const productName = await this.cartProducts.nth(i).innerText();
            const priceText = await this.cartPrices.nth(i).innerText();
            const quantityText = await this.cartQuantities.nth(i).innerText();
            const totalText = await this.cartTotalPrices.nth(i).textContent();

            expect(productName).toBe(cartProductsData[i].name);
            expect(priceText).toBe(cartProductsData[i].price);
            expect(quantityText).toBe(cartProductsData[i].quantity);
            expect(totalText).toBe(cartProductsData[i].total);
        }
    }
}