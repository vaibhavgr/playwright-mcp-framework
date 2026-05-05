import { test } from '../fixtures/baseTest';
import { getNewUserData, getinvalidUser, getexistingUser } from '../../data/userData';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';

test.describe('Auth Tests', () => {

    test('Register User and Delete user', async ({ signUpLoginPage, homePage }) => {
        const user = getNewUserData();

        await signUpLoginPage.goto();

        //Assertion 1 : Have text Signup Login 
        await signUpLoginPage.verifySignupVisible();
        await signUpLoginPage.registerUser(user.name, user.email);

        //Assertion 2 : 
        await signUpLoginPage.fillAccountDetails(user);
        await signUpLoginPage.verifyAccountCreated();
        await signUpLoginPage.clickContinue();

        //Assertion 3 : Verify that 'Logged in as username' is visible
        await expect(homePage.loggedInUser).toBeVisible();
        await expect(homePage.loggedInUser).toContainText(user.name);

        //Delete User Account and verify message
        await homePage.navigateToDeletePage();
        await homePage.verifyAccountDeleted();
        await homePage.clickContinue();
    });

    test('Login with valid credentials and Delete User', async ({ signUpLoginPage, loginPage, homePage }) => {
        const ValidUserDetails = getNewUserData();
        await loginPage.goto();

        //register new user
        await signUpLoginPage.registerUser(ValidUserDetails.name, ValidUserDetails.email);

        //fill account details - signup
        await signUpLoginPage.fillAccountDetails(ValidUserDetails);
        await signUpLoginPage.clickContinue();

        //logout and login with valid user
        await homePage.logoutheaderBtn() // clickLogout() change name 
        await loginPage.loginValidUser(ValidUserDetails.email, ValidUserDetails.password)
        await loginPage.loginBtnClick()

        //delete login user
        await homePage.navigateToDeletePage();
        await homePage.verifyAccountDeleted();
        await homePage.clickContinue();
    });

    test('Login with invalid credentials', async ({ homePage, loginPage }) => {
        const invalidUserdetail = getinvalidUser();
        //Invalid user cred login with taking data from userdata.ts
        await loginPage.goto();
        await loginPage.logininvalidUser(invalidUserdetail.email, invalidUserdetail.password)
        await loginPage.loginBtnClick()

        //assertion Verify error 'Your email or password is incorrect!' is visible

    });

    test.only('Login with Valid User', async ({ loginPage, homePage }) => {
        const existingUserData = getexistingUser();
        await loginPage.goto();

        //logout and login with valid user
        await loginPage.loginValidUser(existingUserData.email, existingUserData.password)
        await loginPage.loginBtnClick()
    });

    test('Register with existing email', async ({ signUpLoginPage }) => {
        const existingUserData = getexistingUser();
        await signUpLoginPage.goto();
        await signUpLoginPage.registerUser(existingUserData.name , existingUserData.email )
        await signUpLoginPage.verifyalreadyRegistertext();
    });

});