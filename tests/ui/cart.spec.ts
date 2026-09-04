import { expect, test } from '../../fixtures/fixture';

test.describe('Cart management @regression', () => {
  test('adds multiple products and verifies separate rows @smoke', async ({ productsPage, cartPage, page }) => {
    await productsPage.open();
    await productsPage.addProductToCart('Blue Top');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await productsPage.addProductToCart('Men Tshirt');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await cartPage.open();

    await expect(cartPage.item('Blue Top')).toBeVisible();
    await expect(cartPage.item('Men Tshirt')).toBeVisible();
    await expect(cartPage.rowCount()).toHaveCount(2);
  });

  test('adds a requested quantity from product details @regression', async ({ productDetailsPage, cartPage, page }) => {
    await productDetailsPage.openProduct(1);
    await productDetailsPage.setQuantity(4);
    await productDetailsPage.addToCart();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await cartPage.open();

    await expect(cartPage.item('Blue Top').locator('.cart_quantity button')).toHaveText('4');
    await expect(cartPage.item('Blue Top').locator('.cart_total_price')).toHaveText('Rs. 2000');
  });

  test('removes a product from the cart @regression', async ({ productsPage, cartPage, page }) => {
    await productsPage.open();
    await productsPage.addProductToCart('Blue Top');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await cartPage.open();
    await cartPage.removeItem('Blue Top');

    await expect(cartPage.item('Blue Top')).toHaveCount(0);
    await expect(page.getByText('Cart is empty!')).toBeVisible();
  });
});