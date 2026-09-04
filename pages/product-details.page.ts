import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  async openProduct(productId: number): Promise<void> {
    await super.open(`/product_details/${productId}`);
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.page.getByRole('spinbutton').fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.page.getByRole('button', { name: /Add to cart/ }).click();
  }

  async submitReview(name: string, email: string, review: string): Promise<void> {
    const reviewForm = this.page.locator('#reviews');
    await reviewForm.getByPlaceholder('Your Name').fill(name);
    await reviewForm.getByPlaceholder('Email Address').fill(email);
    await reviewForm.getByPlaceholder('Add Review Here!').fill(review);
    await reviewForm.getByRole('button', { name: 'Submit' }).click();
  }
}