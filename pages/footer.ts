import type { Page } from '@playwright/test';

export class Footer {
  constructor(private readonly page: Page) {}

  async subscribe(email: string): Promise<void> {
    await this.page.getByPlaceholder('Your email address').fill(email);
    await this.page.locator('#subscribe').click();
  }
}