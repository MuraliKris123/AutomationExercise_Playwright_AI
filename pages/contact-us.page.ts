import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface ContactDetails {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactUsPage extends BasePage {
  private readonly form = this.page.locator('#contact-page');

  async open(): Promise<void> {
    await super.open('/contact_us');
  }

  async submit(details: ContactDetails): Promise<void> {
    await this.form.getByPlaceholder('Name').fill(details.name);
    await this.form.getByPlaceholder('Email', { exact: true }).fill(details.email);
    await this.form.getByPlaceholder('Subject').fill(details.subject);
    await this.form.getByPlaceholder('Your Message Here').fill(details.message);
    await this.form.getByRole('button', { name: 'Submit' }).click();
  }
}