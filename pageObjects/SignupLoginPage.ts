import { Locator, Page } from "@playwright/test";
import {UniqueGenerator} from "../utils/UniqueGenerator"

export class SignUpLoginPage {
  readonly page: Page;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly signupTitle : Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupName = page.getByRole('textbox', { name: 'Name' })
    this.signupEmail = page.locator('[data-qa="signup-email"]')
    this.signupButton = page.getByRole('button', { name: 'Signup' })
    this.signupTitle = page.getByLabel('Mr.')
  }

  async goto() {
    await this.page.goto('/login');
  }

  async registerUser( ) : Promise<any> {
    await this.signupName.fill(UniqueGenerator.getUniqueName())
    await this.signupEmail.fill(UniqueGenerator.getUniqueEmail());
    await this.signupButton.click();

    await this.page.pause();
  }

  
}