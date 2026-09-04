import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface SignupDetails {
  title: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async completeSignup(details: SignupDetails): Promise<void> {
    await this.page.locator(`input[name="title"][value="${details.title}"]`).check();
    await this.page.locator('input[name="password"]').fill(details.password);
    await this.page.locator('select[name="days"]').selectOption('1');
    await this.page.locator('select[name="months"]').selectOption('1');
    await this.page.locator('select[name="years"]').selectOption('2000');
    await this.page.locator('input[name="first_name"]').fill(details.firstName);
    await this.page.locator('input[name="last_name"]').fill(details.lastName);
    await this.page.locator('input[name="address1"]').fill(details.address);
    await this.page.locator('select[name="country"]').selectOption({ label: details.country });
    await this.page.locator('input[name="state"]').fill(details.state);
    await this.page.locator('input[name="city"]').fill(details.city);
    await this.page.locator('input[name="zipcode"]').fill(details.zipcode);
    await this.page.locator('input[name="mobile_number"]').fill(details.mobileNumber);
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }

  async continueToHome(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  async deleteAccount(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/\/delete_account$/),
      this.page.getByRole('link', { name: 'Delete Account' }).click(),
    ]);
  }
}