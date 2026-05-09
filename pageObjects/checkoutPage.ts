import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage{
    readonly page : Page;
    readonly checkoutModalRegisterLoginBtn: Locator;
    readonly proceedtoCheckoutBtn : Locator

    constructor(page : Page){
        this.page = page;
        this.proceedtoCheckoutBtn = page.getByText('Proceed To Checkout');
        this.checkoutModalRegisterLoginBtn = page.getByRole('link', { name: 'Register / Login' });
    }

    //
    async clickProceedtoCheckoutBtn(){
        await this.proceedtoCheckoutBtn.click()
    }

    async clickcheckoutModalRegisterLoginBtn(){
        await this.checkoutModalRegisterLoginBtn.click()
    }
}