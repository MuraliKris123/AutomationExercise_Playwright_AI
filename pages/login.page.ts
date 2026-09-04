import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface LoginCredentials {
  email: string;
  password: string;
}

export class LoginPage extends BasePage {
  private readonly loginForm = this.page.locator('form[action="/login"]');
  private readonly signupForm = this.page.locator('form[action="/signup"]');

  async open(): Promise<void> {
    await super.open('/login');
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.loginForm.getByPlaceholder('Email Address').fill(credentials.email);
    await this.loginForm.getByPlaceholder('Password').fill(credentials.password);
    await this.loginForm.getByRole('button', { name: 'Login' }).click({ noWaitAfter: true });
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupForm.getByPlaceholder('Name').fill(name);
    await this.signupForm.getByPlaceholder('Email Address').fill(email);
    await this.signupForm.getByRole('button', { name: 'Signup' }).click();
  }
}