import { Locator, Page, test } from '@playwright/test';
import { BasePage } from './basePage';
import { Logger } from '@utils/Logger';

export class LoginPage extends BasePage {

    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]')
        this.loginBtn = page.locator('[data-qa="login-button"]')
    }

    //----Actions-----
    async goto(): Promise<void> {
        await test.step('Navigate to Login page', async () => {
            await this.navigateTo('/login');
        });
    }
    async loginValidUser(email: string, password: string): Promise<void> {
        await test.step(`Enter valid credentials for ${email}`, async () => {
            Logger.info(`Filling Creds on login for ${email}`)
            await this.loginEmail.fill(email);
            await this.loginPassword.fill(password);
        });
    }
    async loginBtnClick(): Promise<void> {
        await test.step('Click Login Button', async () => {
            await this.loginBtn.click();
        });
    }
    async logininvalidUser(email: string, password: string): Promise<void> {
        await test.step(`Enter invalid credentials for ${email}`, async () => {
            await this.loginEmail.fill(email);
            await this.loginPassword.fill(password);
        });
    }
}



