import { expect, test } from '../../fixtures/fixture';

test('loads the home page and primary navigation @smoke @regression', async ({ homePage, page }) => {
  await homePage.open();

  await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
  await expect(homePage.header.productsLink).toBeVisible();
  await expect(homePage.header.cartLink).toBeVisible();
  await expect(homePage.header.loginLink).toBeVisible();
});

test('logs out an authenticated user @regression', async ({ loginPage, header, page }) => {
  test.skip(!process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD, 'Configured credentials required.');
  await loginPage.open();
  await loginPage.login({ email: process.env.TEST_USER_EMAIL ?? '', password: process.env.TEST_USER_PASSWORD ?? '' });
  await expect(page.getByText(/Logged in as/)).toBeVisible();
  await header.logout();
  await expect(page).toHaveURL(/\/login$/);
});