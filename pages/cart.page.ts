import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private readonly rows = this.page.locator('#cart_info_table tbody tr');

  async open(): Promise<void> {
    await super.open('/view_cart');
  }

  item(name: string): Locator {
    return this.rows.filter({ hasText: name }).first();
  }

  async removeItem(name: string): Promise<void> {
    await this.item(name).locator('.cart_quantity_delete').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByText('Proceed To Checkout', { exact: true }).click();
  }

  async subscribe(email: string): Promise<void> {
    await this.page.getByPlaceholder('Your email address').fill(email);
    await this.page.locator('#subscribe').click();
  }

  rowCount(): Locator {
    return this.rows;
  }
}