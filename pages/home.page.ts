import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Header } from './header';
import { Footer } from './footer';

export class HomePage extends BasePage {
  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async open(): Promise<void> {
    await super.open('/');
  }

  async goToProducts(): Promise<void> {
    await this.header.goToProducts();
  }

  async goToLogin(): Promise<void> {
    await this.header.goToLogin();
  }

  async subscribe(email: string): Promise<void> {
    await this.footer.subscribe(email);
  }
}