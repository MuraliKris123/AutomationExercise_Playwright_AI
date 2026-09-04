import { expect, test } from '../../fixtures/fixture';

test('submits a product review @regression', async ({ productDetailsPage, page }) => {
  await productDetailsPage.openProduct(1);
  await productDetailsPage.submitReview(
    'Automation Reviewer',
    'reviewer@example.com',
    'Useful product for UI automation coverage.',
  );

  await expect(page.getByText('Thank you for your review.')).toBeVisible();
});