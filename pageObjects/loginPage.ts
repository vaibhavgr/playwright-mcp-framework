import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {

    readonly loginEmail;
    readonly loginPassword;
    readonly loginBtn

    constructor(page: Page) {
        super(page);

        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]')
        this.loginBtn = page.locator('[data-qa="login-button"]')
    }

    //----Actions-----
    async goto() {
        await this.navigateTo('/login');
    }

    async loginValidUser(email : string , password : string){
        await  this.loginEmail.fill(email)
        await this.loginPassword.fill(password)
       
    }
    
    async loginBtnClick()
    {
       await this.loginBtn.click()
    }

    async logininvalidUser(email : string , password : string){
        await this.loginEmail.fill(email)
        await this.loginPassword.fill(password)
    }

    //Assertions 


}
