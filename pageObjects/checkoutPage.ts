import { Locator, Page, expect } from "@playwright/test";
import { User } from "../data/userData";

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutModalRegisterLoginBtn: Locator;
    readonly proceedtoCheckoutBtn: Locator
    readonly deliveryAddressLines: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proceedtoCheckoutBtn = page.getByText('Proceed To Checkout');
        this.checkoutModalRegisterLoginBtn = page.getByRole('link', { name: 'Register / Login' });
        this.deliveryAddressLines = page.locator('#address_delivery li');
    }

    //
    async clickProceedtoCheckoutBtn() {
        await this.proceedtoCheckoutBtn.click()
    }

    async clickcheckoutModalRegisterLoginBtn() {
        await this.checkoutModalRegisterLoginBtn.click()
    }


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
        await this.page.pause();
    }

}