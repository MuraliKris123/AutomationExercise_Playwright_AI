import { expect, test } from '../../fixtures/fixture';
import { createUniqueEmail } from '../../utils/common-utils';

test.describe('Subscription @regression', () => {
  test('subscribes from the home page @regression', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.subscribe(createUniqueEmail('subscriber'));

    await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
  });

  test('validates an invalid subscription email @regression', async ({ homePage, page }) => {
    await homePage.open();
    const email = page.getByPlaceholder('Your email address');
    await email.fill('invalid-email');
    await expect(email).toHaveAttribute('type', 'email');
  });

  test('subscribes from the cart page @regression', async ({ cartPage, page }) => {
    await cartPage.open();
    await cartPage.subscribe(createUniqueEmail('cart-subscriber'));

    await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
  });
});