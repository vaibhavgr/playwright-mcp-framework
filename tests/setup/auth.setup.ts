
import { test as setup } from '@fixtures/baseTest';
import { LoginPage } from '@pageObjects/loginPage';
import { getexistingUser } from '@data/userData';
import path from 'path';

// auth token save in this location
const authFile = path.resolve('playwright/.auth/user.json');

setup('authenticate user and save storage state', async ({ loginPage, page }) => {
    // 1. Direct fixture use kiya, object banane ki jarurat nahi
    await loginPage.goto();
    
    // 2. Perform login
    const existingUserData = getexistingUser();
    await loginPage.loginValidUser(existingUserData.email, existingUserData.password);
    await loginPage.loginBtnClick();
    
    // 3. Wait for URL redirect (Home page)
    await page.waitForURL('**/');
    
    // 4. Save state
    await page.context().storageState({ path: authFile });
});