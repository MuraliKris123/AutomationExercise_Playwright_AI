import type { Locator } from '@playwright/test';

export class ProductCard {
  constructor(private readonly card: Locator) {}

  get name(): Locator {
    return this.card.locator('.productinfo p').first();
  }

  get price(): Locator {
    return this.card.locator('.productinfo h2').first();
  }

  async viewDetails(): Promise<void> {
    await this.card.getByRole('link', { name: /View Product/ }).click();
  }

  link(): Locator {
    return this.card.getByRole('link', { name: /View Product/ });
  }

  async addToCart(): Promise<void> {
    await this.card.locator('.add-to-cart').first().click();
  }
}