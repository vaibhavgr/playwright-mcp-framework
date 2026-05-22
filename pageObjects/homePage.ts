import { Locator, Page, expect } from '@playwright/test';

export class HomePage {

    readonly page: Page;

    readonly loggedInUser: Locator;
    readonly deletaccountHeader: Locator
    readonly textDeleteAccount: Locator
    readonly continueBtn: Locator
    readonly logoutHeader: Locator
    readonly categoryHeading: Locator
    readonly categoryList: Locator
    readonly subcategory: Locator



    constructor(page: Page) {
        this.page = page;
        this.loggedInUser = page.locator(`//a[contains(normalize-space(), 'Logged in as')]`);
        this.deletaccountHeader = page.getByRole('link', { name: 'Delete Account' })
        this.textDeleteAccount = page.getByText('Account Deleted!', { exact: true })
        this.continueBtn = page.locator('[data-qa="continue-button"]')
        this.logoutHeader = page.getByRole('link', { name: ' Logout' })
        this.categoryHeading = page.getByRole('heading', { name: 'Category' });
        this.categoryList = page.locator('.category-products .panel-title a');
        this.subcategory = this.page.locator('.panel-body ul li a')


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

    async verifyCategoriesVisible() {

        // 1. Heading visible honi chahiye
        await expect(this.categoryHeading).toBeVisible();

        const count = await this.categoryList.count()

        for (let i = 0; i < count; i++) {
            await expect(this.categoryList.nth(i)).toBeVisible();


        }


    }
    async clickCategory(category: string, subcategory: string) {
        // 1st line: Category click
        await this.categoryList.getByText(category, { exact: true }).click()

        // 2. Subcategory click
        await this.subcategory.filter({ hasText: subcategory }).filter({ visible: true }).click();
    }





}