import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';


export class HomePage extends BasePage {

    readonly loggedInUser: Locator;
    readonly deletaccountHeader: Locator;
    readonly textDeleteAccount: Locator;
    readonly continueBtn: Locator;
    readonly logoutHeader: Locator;
    readonly categoryHeading: Locator;
    readonly categoryList: Locator;
    readonly subcategory: Locator;



    constructor(page: Page) {

        super(page);
        this.loggedInUser = page.locator(`//a[contains(normalize-space(), 'Logged in as')]`);
        this.deletaccountHeader = page.getByRole('link', { name: 'Delete Account' })
        this.textDeleteAccount = page.getByText('Account Deleted!', { exact: true })
        this.continueBtn = page.locator('[data-qa="continue-button"]')
        this.logoutHeader = page.getByRole('link', { name: ' Logout' })
        this.categoryHeading = page.getByRole('heading', { name: 'Category' });
        this.categoryList = page.locator('.category-products .panel-title a');
        this.subcategory = this.page.locator('.panel-body ul li a')


    }


    async goto(): Promise<void> {
        await this.navigateTo('/');
    }

    async navigateToDeletePage(): Promise<void> {
        await this.deletaccountHeader.click();
    }

    async verifyAccountDeleted(): Promise<void> {
        expect(this.textDeleteAccount.isVisible());
        await expect(this.textDeleteAccount).toHaveText('Account Deleted!')
    }

    async clickContinue(): Promise<void> {
        await this.continueBtn.click();
    }
    async logoutheaderBtn(): Promise<void> {
        await this.logoutHeader.click()
    }

    async verifyCategoriesVisible(): Promise<void> {
        // 1. Heading visible honi chahiye
        await expect(this.categoryHeading).toBeVisible();
        const count = await this.categoryList.count()
        for (let i = 0; i < count; i++) {
            await expect(this.categoryList.nth(i)).toBeVisible();
        }
    }
    async clickCategory(category: string, subcategory: string) : Promise<void>{
        // 1st line: Category click
        await this.categoryList.getByText(category, { exact: true }).click()

        // 2. Subcategory click
        await this.subcategory.filter({ hasText: subcategory }).filter({ visible: true }).click();
    }





}