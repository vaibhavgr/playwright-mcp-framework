import { Locator, Page, expect } from '@playwright/test';

export class HomePage {

    readonly page: Page;

    readonly loggedInUser: Locator;
    readonly deletaccountHeader: Locator
    readonly textDeleteAccount: Locator
    readonly continueBtn: Locator
    readonly logoutHeader: Locator


    constructor(page: Page) {
        this.page = page;
        this.loggedInUser = page.locator(`//a[contains(normalize-space(), 'Logged in as')]`);
        this.deletaccountHeader = page.getByRole('link', { name: 'Delete Account' })
        this.textDeleteAccount = page.getByText('Account Deleted!', { exact: true })
        this.continueBtn = page.locator('[data-qa="continue-button"]')
        this.logoutHeader = page.getByRole('link', { name: ' Logout' })

    }


    async goto() {
        await this.page.goto('/');
    }
    
    async navigateToDeletePage() {
        await this.deletaccountHeader.click()
    }

    async verifyAccountDeleted() {
        expect(this.textDeleteAccount.isVisible());
        await expect(this.textDeleteAccount).toHaveText('Account Deleted!')
    }

    async clickContinue() {
        await this.continueBtn.click();
    }
    async logoutheaderBtn() {
        await this.logoutHeader.click()
    }



}