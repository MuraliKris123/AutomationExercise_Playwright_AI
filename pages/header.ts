import type { Locator, Page } from '@playwright/test';

export class Header {
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;

  constructor(private readonly page: Page) {
    this.homeLink = page.getByRole('link', { name: /Home/ });
    this.productsLink = page.getByRole('link', { name: /Products/ });
    this.cartLink = page.getByRole('link', { name: /Cart/ });
    this.loginLink = page.getByRole('link', { name: /Signup \/ Login/ });
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  async goToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async goToLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: /Logout/ }).click();
  }

  async deleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: /Delete Account/ }).click();
  }
}