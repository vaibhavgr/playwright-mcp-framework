import { test} from '../fixtures/baseTest';
import { getNewUserData } from '../../data/userData';
import { expect } from '@playwright/test';

test.describe('Auth Tests', () => {

    test.only('Register User', async ({ signUpLoginPage }) => {
        const user = getNewUserData();
        await signUpLoginPage.goto();
        
        //Assertion 1 : Have text Signup Login 
        await expect(signUpLoginPage.textNewUserSignup).toHaveText('New User Signup!')
        await signUpLoginPage.registerUser(user.name, user.email);
        
        // Assertion :  Verify that 'ENTER ACCOUNT INFORMATION' is visible
        const textaccountIsVisible = await signUpLoginPage.fillAccountDetails(user);
        await expect(textaccountIsVisible).toHaveText('Account Created!')
    });

    test('Login with valid credentials', async ({ loginPage }) => {
        // valid login
    });

    test('Login with invalid credentials', async ({ loginPage }) => {
        // negative case
    });

    test('Logout User', async ({ homePage }) => {
        // logout
    });

    test('Register with existing email', async ({ signUpLoginPage }) => {
        // negative register
    });

});