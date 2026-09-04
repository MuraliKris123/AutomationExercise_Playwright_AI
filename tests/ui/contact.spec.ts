import { expect, test } from '../../fixtures/fixture';
import contactData from '../test-data/contactData.json';

test.describe('Contact Us @regression', () => {
  test('submits the Contact Us form @regression', async ({ contactUsPage, page }) => {
    await contactUsPage.open();
    page.once('dialog', dialog => dialog.accept());
    await contactUsPage.submit(contactData.valid);

    await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
  });

  test('requires contact form fields @regression', async ({ contactUsPage, page }) => {
    await contactUsPage.open();
    const email = page.locator('#contact-page').getByPlaceholder('Email', { exact: true });
    await expect(email).toHaveAttribute('required', 'required');
  });
});