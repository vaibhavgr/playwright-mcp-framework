import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly loginEmail;
    readonly loginPassword;
    readonly loginBtn

    constructor(page: Page) {
        this.page = page;

        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]')
        this.loginBtn = page.locator('[data-qa="login-button"]')
    }

    //----Actions-----
    async goto() {
        await this.page.goto('/login');
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
