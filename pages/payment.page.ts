import type { Download, Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface PaymentDetails {
  name: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class PaymentPage extends BasePage {
  async pay(details: PaymentDetails): Promise<void> {
    await this.page.locator('input[name="name_on_card"]').fill(details.name);
    await this.page.locator('input[name="card_number"]').fill(details.cardNumber);
    await this.page.getByPlaceholder('ex. 311').fill(details.cvc);
    await this.page.getByPlaceholder('MM').fill(details.expiryMonth);
    await this.page.getByPlaceholder('YYYY').fill(details.expiryYear);
    await this.page.getByRole('button', { name: /Pay and Confirm Order/ }).click();
  }

  async downloadInvoice(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('link', { name: /Download Invoice/ }).click();
    return downloadPromise;
  }
}