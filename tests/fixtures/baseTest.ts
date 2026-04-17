import { test as baseTest } from '@playwright/test';


import { LoginPage } from '../../pageObjects/loginPage';
import { CartPage } from '../../pageObjects/cartPage';
import { ContactUsPage } from '../../pageObjects/contactUsPage';
import { HomePage } from '../../pageObjects/homePage';
import { ProductPage } from '../../pageObjects/productsPage';
import { SignUpLoginPage } from '../../pageObjects/SignupLoginPage';
import { ApiUtils } from '../../utils/APIUtils'

// 1. Declare the type of your custom fixtures
type MyFixtures = {
    loginPage: LoginPage;
    cartPage: CartPage;
    contactUsPage: ContactUsPage;
    homePage: HomePage;
    productPage: ProductPage;
    signUpLoginPage: SignUpLoginPage;
    apiUtil: ApiUtils;
};


// 2. Pass the type <MyFixtures> into the extend function
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    contactUsPage: async ({ page }, use) => {
        const contactusPage = new ContactUsPage(page);
        await use(contactusPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    signUpLoginPage: async ({ page }, use) => {
        const signUpLoginPage = new SignUpLoginPage(page);
        await use(signUpLoginPage);
    },

    apiUtil: async ({ request }, use) => {
        const apiUtil = new ApiUtils(request);
        await use(apiUtil);
    },




});
