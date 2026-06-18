
import { test as setup } from '@fixtures/baseTest';
import { LoginPage } from '@pageObjects/loginPage';
import { getexistingUser } from '@data/userData';
import path from 'path';

// auth token save in this location
const authFile = path.resolve('playwright/.auth/user.json');

setup('authenticate user and save storage state', async ({ loginPage, page }) => {
    // 1. Direct fixture use kiya, object banane ki jarurat nahi
    await loginPage.goto();
    
    // Debug info: print title and URL to verify page state on CI
    console.log(`[DEBUG] Page Title: ${await page.title()}`);
    console.log(`[DEBUG] Page URL: ${page.url()}`);
    
    try {
        // Wait for login email input element to check if page fully rendered
        await page.waitForSelector('[data-qa="login-email"]', { timeout: 15000 });
    } catch (err) {
        console.error(`[DEBUG ERROR] Selector [data-qa="login-email"] not found!`);
        console.error(`[DEBUG ERROR] Current URL: ${page.url()}`);
        console.error(`[DEBUG ERROR] Page Title: ${await page.title()}`);
        const bodyText = await page.locator('body').innerText();
        console.error(`[DEBUG ERROR] Page Body Snippet: ${bodyText.substring(0, 1000)}`);
        throw err;
    }
    
    // 2. Perform login
    const existingUserData = getexistingUser();
    await loginPage.loginValidUser(existingUserData.email, existingUserData.password);
    await loginPage.loginBtnClick();
    
    // 3. Wait for URL redirect (Home page)
    await page.waitForURL('**/', { waitUntil: 'domcontentloaded' });
    
    // 4. Save state
    await page.context().storageState({ path: authFile });
});