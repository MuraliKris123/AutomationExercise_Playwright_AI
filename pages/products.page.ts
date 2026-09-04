import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductCard } from './product-card';

export class ProductsPage extends BasePage {
  private readonly cards = this.page.locator('.product-image-wrapper');
  private readonly searchInput = this.page.getByPlaceholder('Search Product');

  async open(): Promise<void> {
    await super.open('/products');
  }

  product(name: string): ProductCard {
    const card = this.cards.filter({ hasText: name }).first();
    return new ProductCard(card);
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.page.locator('#submit_search').click();
  }

  async openProduct(name: string): Promise<void> {
    const productLink = this.product(name).link();
    const href = await productLink.getAttribute('href');
    if (!href) {
      throw new Error(`Product details link not found for: ${name}`);
    }
    await this.page.goto(href);
  }

  async addProductToCart(name: string): Promise<void> {
    await this.product(name).addToCart();
  }

  async selectCategory(category: string): Promise<void> {
    const categoryIds: Record<string, number> = {
      Women: 1,
      Men: 2,
      Kids: 3,
    };
    const categoryId = categoryIds[category];
    if (!categoryId) {
      throw new Error(`Unsupported product category: ${category}`);
    }
    await this.page.goto(`/category_products/${categoryId}`);
  }

  async selectBrand(brand: string): Promise<void> {
    await this.page.goto(`/brand_products/${encodeURIComponent(brand)}`);
  }

  resultCards(): Locator {
    return this.cards;
  }
}