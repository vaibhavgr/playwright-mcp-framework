import { Locator, Page, expect } from "@playwright/test";
import { testCardData } from '../data/paymentData'

export class PaymentPage {
    readonly page: Page;
    readonly cardNumber: Locator;
    readonly cardName: Locator;
    readonly expiryMonth: Locator
    readonly expiryYear: Locator
    readonly cvc: Locator;
    readonly payBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardName = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expiryMonth = page.locator('[data-qa="expiry-month"]');
        this.expiryYear = page.locator('[data-qa="expiry-year"]');
        this.payBtn = page.locator('[data-qa="pay-button"]');
    }

    async fillPaymentDetails() {
        const cardData = testCardData;
        await this.cardName.fill(cardData.nameOnCard);
        await this.cardNumber.fill(cardData.cardNumber);
        await this.cvc.fill(cardData.cvc)
        await this.expiryMonth.fill(cardData.expiryMonth)
        await this.expiryYear.fill(cardData.expiryYear)
        
    }




}