import { expect } from '../../fixtures/fixture';
import { test } from '../../fixtures/fixture';
import { environment } from '../../config/environment';
import loginData from '../test-data/loginData.json';
import signupData from '../test-data/signupData.json';
import { createUniqueEmail } from '../../utils/common-utils';

test.describe('Authentication @regression', () => {
  test('logs in with valid credentials @smoke @login', async ({ loginPage, page }) => {
    test.skip(
      !environment.testUserEmail || !environment.testUserPassword,
      'Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env to run this scenario.',
    );

    await loginPage.open();
    await loginPage.login({
      email: environment.testUserEmail ?? '',
      password: environment.testUserPassword ?? '',
    });

    await expect(page.getByText(/Logged in as/)).toBeVisible();
  });

  test('rejects invalid credentials @login', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(loginData.invalidCredentials);

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('requires login credentials @login', async ({ loginPage, page }) => {
    await loginPage.open();
    await expect(page.locator('form[action="/login"] input[name="email"]')).toHaveAttribute('required', '');
    await expect(page.locator('form[action="/login"] input[name="password"]')).toHaveAttribute('required', '');
  });

  test('rejects signup with an invalid email @signup', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.startSignup('Invalid Signup', signupData.invalidEmail);

    await expect(page.locator('form[action="/signup"] input[name="email"]')).toHaveAttribute('type', 'email');
  });

  test('rejects signup with an existing email @signup', async ({ loginPage, page }) => {
    test.skip(!environment.testUserEmail, 'Set TEST_USER_EMAIL in .env to run this scenario.');
    await loginPage.open();
    await loginPage.startSignup('Existing User', environment.testUserEmail ?? '');

    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });

  test('signs up with a unique email @smoke @signup', async ({ loginPage, signupPage, page }) => {
    test.setTimeout(60_000);
    const user = signupData.validUser;
    await loginPage.open();
    await loginPage.startSignup(user.name, createUniqueEmail());
    await expect(page).toHaveURL(/\/signup$/);

    await signupPage.completeSignup(user);
    await expect(page.getByText('Account Created!')).toBeVisible();
    await signupPage.continueToHome();
    await expect(page.getByText(/Logged in as/)).toBeVisible();

    await signupPage.deleteAccount();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
  });
});