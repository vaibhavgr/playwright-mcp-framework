import { Locator, Page, expect } from "@playwright/test";
import { PaymentDetails } from '../data/paymentData';
import fs from 'fs';




export class PaymentPage {
    readonly page: Page;
    readonly cardNumber: Locator;
    readonly cardName: Locator;
    readonly expiryMonth: Locator
    readonly expiryYear: Locator
    readonly cvc: Locator;
    readonly payBtn: Locator;
    readonly successOrderMsg: Locator
    readonly downloadInvoiceBtn: Locator

    constructor(page: Page) {
        this.page = page;
        this.cardName = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expiryMonth = page.locator('[data-qa="expiry-month"]');
        this.expiryYear = page.locator('[data-qa="expiry-year"]');
        this.payBtn = page.locator('[data-qa="pay-button"]');
        this.successOrderMsg = page.getByText('Congratulations! Your order has been confirmed!', { exact: true })
        this.downloadInvoiceBtn = page.getByRole('link', { name: 'Download Invoice' })
    }

    async fillPaymentDetails(cardData: PaymentDetails) {

        await this.cardName.fill(cardData.nameOnCard);
        await this.cardNumber.fill(cardData.cardNumber);
        await this.cvc.fill(cardData.cvc)
        await this.expiryMonth.fill(cardData.expiryMonth)
        await this.expiryYear.fill(cardData.expiryYear)
        await this.payBtn.click();

    }

    async verifySuccessOrdertext() {
        await expect(this.successOrderMsg, 'Payment success message was not visible after clicking Pay').toBeVisible();
    }

    async downloadAndVerifyInvoice(userName: string, lastName: string, grandTotal: string) {

        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadInvoiceBtn.click()
        const download = await downloadPromise;
        const filePath = await download.path();
        const filecontent = fs.readFileSync(filePath, 'utf-8')
        console.log(filecontent)
        expect(filecontent).toContain(`Hi ${userName} ${lastName}, Your total purchase amount is ${grandTotal}`);



    }




}