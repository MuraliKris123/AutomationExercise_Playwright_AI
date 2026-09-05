import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ContactUsPage } from '../pages/contact-us.page';
import { Footer } from '../pages/footer';
import { Header } from '../pages/header';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { ProductsPage } from '../pages/products.page';
import { SignupPage } from '../pages/signup.page';
import { PaymentPage } from '../pages/payment.page';

const advertisingHosts = [
  'adsrvr.org',
  'doubleclick.net',
  'googleads.g.doubleclick.net',
  'googlesyndication.com',
  'pagead2.googlesyndication.com',
];

function isAdvertisingRequest(url: string): boolean {
  const hostname = new URL(url).hostname;
  return advertisingHosts.some(host => hostname === host || hostname.endsWith(`.${host}`));
}

interface FrameworkFixtures {
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactUsPage: ContactUsPage;
  footer: Footer;
  header: Header;
  homePage: HomePage;
  loginPage: LoginPage;
  productDetailsPage: ProductDetailsPage;
  productsPage: ProductsPage;
  paymentPage: PaymentPage;
  signupPage: SignupPage;
}

export const test = base.extend<FrameworkFixtures>({
  page: async ({ page }, use) => {
    await page.route('**/*', async route => {
      if (isAdvertisingRequest(route.request().url())) {
        await route.abort();
        return;
      }

      await route.continue();
    });
    await use(page);
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});

export { expect } from '@playwright/test';
