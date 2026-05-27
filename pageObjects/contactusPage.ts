import { expect, Locator, Page } from "@playwright/test";
import { ContactUsFormData } from "@data/contactusData";
import { BasePage } from "./basePage";

export class ContactUsPage extends BasePage {
    readonly contactusheader: Locator;
    readonly textgetintouch: Locator;

    //contact us form
    readonly contactNameInput: Locator;
    readonly contactEmailInput: Locator;
    readonly contactSubmitButton: Locator;
    readonly contactSubjectInput: Locator
    readonly contactMessage: Locator;
    readonly contactUploadfile: Locator;

    //SuccesfulMessage
    readonly successfulMessage : Locator;



    constructor(page: Page) {
        super(page);

        this.contactusheader = page.getByText('Contact us', { exact: true });
        this.textgetintouch = page.getByRole('heading', { name: 'Get In Touch' })

        //contact us form
        this.contactNameInput = page.locator('[data-qa="name"]')
        this.contactEmailInput = page.locator('[data-qa="email"]')
        this.contactSubjectInput = page.locator('[data-qa="subject"]')
        this.contactMessage = page.locator('[data-qa="message"]')
        this.contactSubmitButton = page.locator('[data-qa="submit-button"]')
        this.contactUploadfile = page.locator('[name="upload_file"]')

        //Succesfull Mesage 
        this.successfulMessage = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');

    }
    // Navigation actions
     async goto(): Promise<void> {
        await this.navigateTo('/');
    }

    async navigateToContactusPage(): Promise<void> {
        await this.contactusheader.click();
    }

   async contactusForm(contactusdata: ContactUsFormData): Promise<void> {
        await this.contactNameInput.fill(contactusdata.contactName);
        await this.contactEmailInput.fill(contactusdata.contactEmail);
        await this.contactSubjectInput.fill(contactusdata.contactSubject);
        await this.contactMessage.fill(contactusdata.contactMessage);
        await this.contactUploadfile.setInputFiles('data/sample.txt');
        
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.contactSubmitButton.click();
    }

    //Assertions

   async verifyGetintouch(): Promise<void> {
        await expect(this.textgetintouch).toBeVisible();
        await expect(this.textgetintouch).toHaveText('Get In Touch');
    }

   async verifySuccessMessage(): Promise<void> {
        await expect(this.successfulMessage).toBeVisible();
        await expect(this.successfulMessage).toHaveText('Success! Your details have been submitted successfully.');
    }

}