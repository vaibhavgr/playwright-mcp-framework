import { test} from '../fixtures/baseTest';

test.describe('Auth Tests', () => {

    test.only('Register User', async ({ signUpLoginPage }) => {
        await signUpLoginPage.goto();
        await signUpLoginPage.registerUser("Vaibhav" , 'vaibhav@gmail.com');
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