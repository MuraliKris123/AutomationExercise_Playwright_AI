import { expect, test } from '../../fixtures/fixture';
import { environment } from '../../config/environment';
import { createUniqueEmail } from '../../utils/common-utils';
import signupData from '../test-data/signupData.json';
import paymentData from '../test-data/paymentData.json';

test.describe('Checkout and payment @regression', () => {
  test('requires authentication before guest checkout @smoke @p0', async ({ productsPage, cartPage, page }) => {
    await productsPage.open();
    await productsPage.addProductToCart('Blue Top');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await cartPage.open();
    await cartPage.proceedToCheckout();

    await expect(page.getByRole('link', { name: 'Register / Login' })).toBeVisible();
  });

  test('places an order using configured credentials @p0', async ({ loginPage, productsPage, cartPage, checkoutPage, paymentPage, page }) => {
    test.setTimeout(60_000);
    test.skip(
      !environment.testUserEmail || !environment.testUserPassword,
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env to run this scenario.',
    );

    await loginPage.open();
    await loginPage.login({ email: environment.testUserEmail ?? '', password: environment.testUserPassword ?? '' });
    await expect(page.getByText(/Logged in as/)).toBeVisible();
    await productsPage.open();
    await productsPage.addProductToCart('Blue Top');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await cartPage.open();
    await cartPage.proceedToCheckout();
    await expect(checkoutPage.address()).toBeVisible();
    await checkoutPage.addComment('Automated checkout verification');
    await checkoutPage.placeOrder();
    await paymentPage.pay(paymentData.testCard);

    await expect(page.getByText('Order Placed!')).toBeVisible();
    const invoice = await paymentPage.downloadInvoice();
    expect(invoice.suggestedFilename()).toMatch(/invoice/i);
  });

  test('registers during checkout with an isolated account @p0', async ({ productsPage, cartPage, loginPage, signupPage, checkoutPage, paymentPage, page }) => {
    test.setTimeout(90_000);
    await productsPage.open();
    await productsPage.addProductToCart('Blue Top');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await cartPage.open();
    await cartPage.proceedToCheckout();
    await checkoutPage.loginPrompt();
    await loginPage.startSignup(signupData.validUser.name, createUniqueEmail('checkout'));
    await signupPage.completeSignup(signupData.validUser);
    await expect(page.getByText('Account Created!')).toBeVisible();
    await signupPage.continueToHome();
    await cartPage.open();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await paymentPage.pay(paymentData.testCard);
    await expect(page.getByText('Order Placed!')).toBeVisible();
    await signupPage.deleteAccount();
  });
});