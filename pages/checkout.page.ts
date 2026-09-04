import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  async loginPrompt(): Promise<void> {
    await this.page.getByRole('link', { name: /Register \/ Login/ }).click();
  }

  async addComment(comment: string): Promise<void> {
    await this.page.locator('textarea[name="message"]').fill(comment);
  }

  async placeOrder(): Promise<void> {
    await this.page.getByRole('link', { name: /Place Order/ }).click();
  }

  address(): ReturnType<Page['locator']> {
    return this.page.locator('#address_delivery');
  }
}