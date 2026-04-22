import { Locator, Page } from "@playwright/test";
import { getNewUserData, User } from '../data/userData';

export class SignUpLoginPage {
  readonly page: Page;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly accountDetailsTitle: Locator;
  readonly accountDetailsPassword: Locator;
  readonly dateOfBirthDay: Locator;
  readonly dateOfBirthMonth: Locator;
  readonly dateOfBirthYear: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOfferCheckbox: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly companyName: Locator;
  readonly address: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipCode: Locator
  readonly mobileNumber: Locator;
  readonly createAccountBtn : Locator;
  readonly textNewUserSignup : Locator;
  readonly textAccountVisible : Locator
  readonly continueBtn: Locator

  constructor(page: Page) {
    this.page = page;
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' })
    this.accountDetailsTitle = page.getByLabel('Mr.')
    this.accountDetailsPassword = page.getByRole('textbox', { name: 'password' });
    this.dateOfBirthDay = page.locator('[data-qa="days"]');
    this.dateOfBirthMonth = page.locator('[data-qa="months"]');
    this.dateOfBirthYear = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOfferCheckbox = page.locator('#optin');
    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.companyName = page.locator('[data-qa="company"]');
    this.address = page.locator('[data-qa="address"]');
    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('[data-qa="state"]');
    this.city = page.locator('[data-qa="city"]');
    this.zipCode = page.locator('[data-qa="zipcode"]');
    this.mobileNumber = page.locator('[data-qa="mobile_number"]');
    this.createAccountBtn = page.getByRole('button', { name: 'Create Account' })
    this.textNewUserSignup = page.getByRole('heading', { name: 'New User Signup!' })
    this.textAccountVisible = page.getByText('Account Created!', { exact: true })
    this.continueBtn= page.locator('[data-qa="continue-button"]')
  }

  async goto() {
    await this.page.goto('/login');
  }

  async registerUser(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  async fillAccountDetails(user: User ) : Promise<Locator>{
    
    await this.accountDetailsTitle.click();
    await this.accountDetailsPassword.fill(user.password)
    await this.dateOfBirthDay.selectOption('4');
    await this.dateOfBirthMonth.selectOption('June')
    await this.dateOfBirthYear.selectOption('2006')
    await this.newsletterCheckbox.click();
    await this.specialOfferCheckbox.click();
    await this.firstName.fill(user.firstName)
    await this.lastName.fill(user.lastName)
    await this.companyName.fill(user.company)
    await this.address.fill(user.address)
    await this.country.selectOption('India')
    await this.state.fill(user.state)
    await this.city.fill(user.city)
    await this.zipCode.fill(user.zipcode)
    await this.mobileNumber.fill(user.mobile)
    await this.createAccountBtn.click()
    return this.textAccountVisible
  }


}