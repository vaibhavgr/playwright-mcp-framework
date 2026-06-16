import { test as baseTest } from '@playwright/test';
import { Logger } from '@utils/Logger';
import path from 'path';


import { LoginPage } from '@pageObjects/loginPage';
import { CartPage } from '@pageObjects/cartPage';
import { ContactUsPage } from '@pageObjects/contactUsPage';
import { HomePage } from '@pageObjects/homePage';
import { ProductPage } from '@pageObjects/productsPage';
import { SignUpLoginPage } from '@pageObjects/SignupLoginPage';
import { ApiUtils } from '@utils/APIUtils';
import { CheckoutPage } from '@pageObjects/checkoutPage';
import { PaymentPage } from '@pageObjects/paymentPage';

// 1. Declare the type of your custom fixtures
type MyFixtures = {
    loginPage: LoginPage;
    cartPage: CartPage;
    contactUsPage: ContactUsPage;
    homePage: HomePage;
    productPage: ProductPage;
    signUpLoginPage: SignUpLoginPage;
    apiUtil: ApiUtils;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage
};


// 2. Pass the type <MyFixtures> into the extend function
export const test = baseTest.extend<MyFixtures>({

    // Override the default 'page' fixture to block ads globally
    page: async ({ page }, use) => {
        await page.route('**/*', (route) => {
            const url = route.request().url();
            if (url.includes('googleads') || url.includes('googlesyndication') || url.includes('doubleclick') || url.includes('adservice')) {
                route.abort();
            } else {
                route.continue();
            }
        });
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },


    paymentPage: async ({ page }, use) => {
        const paymentPage = new PaymentPage(page);
        await use(paymentPage)
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

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
});
test.beforeEach(async ({ }, testinfo) => {
    const relativeSuitePath = path.relative(process.cwd(), testinfo.file).replace(/\\/g, '/');
    Logger.info(`Currently test running: ${testinfo.title}`, {
        testName: testinfo.title,
        browser: testinfo.project.name,
        suite: relativeSuitePath,
        status : 'running'
    });
});

test.afterEach(async ({ page }, testinfo) => {
    const status = testinfo.status;
    const duration = testinfo.duration;
    const relativeSuitePath = path.relative(process.cwd(), testinfo.file).replace(/\\/g, '/');

   
    const metadata = {
        testName: testinfo.title,
        browser: testinfo.project.name,
        suite: relativeSuitePath,
        status: status,
        duration: duration,
       
    };

    if (status === 'passed') {
        Logger.info(`Test Passed : ${testinfo.title} in ${duration}ms`, metadata);
    } else if (status === 'failed' || status === 'timedOut') {
        Logger.error(
            `Test failed : ${testinfo.title} in ${duration}ms`,
            testinfo.error?.stack || testinfo.error?.message,
            metadata
        );
    }
});

