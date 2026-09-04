import { expect } from '../../fixtures/fixture';
import { test } from '../../fixtures/fixture';
import productsData from '../test-data/productsData.json';

test.describe('Products and cart @regression', () => {
  test('displays the product listing @smoke', async ({ productsPage, page }) => {
    await productsPage.open();

    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    await expect(productsPage.resultCards().first()).toBeVisible();
  });

  test('searches for a product @smoke', async ({ productsPage, page }) => {
    await productsPage.open();
    await productsPage.search('Blue Top');

    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    await expect(productsPage.product('Blue Top').name).toHaveText('Blue Top');
  });

  test('opens product details @regression', async ({ productsPage, page }) => {
    await productsPage.open();
    await productsPage.openProduct('Blue Top');

    await expect(page).toHaveURL(/\/product_details\/1$/);
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Availability: In Stock')).toBeVisible();
    await expect(page.getByRole('spinbutton')).toHaveValue('1');
  });

  test('adds a product and verifies the cart @smoke', async ({ productsPage, cartPage, page }) => {
    await productsPage.open();
    await productsPage.addProductToCart('Blue Top');
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await cartPage.open();

    const item = cartPage.item('Blue Top');
    await expect(item).toBeVisible();
    await expect(item).toContainText('Rs. 500');
    await expect(item.locator('.cart_quantity button')).toHaveText('1');
    await expect(item.locator('.cart_total_price')).toHaveText('Rs. 500');
  });

  test('returns no results for an unknown product @regression', async ({ productsPage, page }) => {
    await productsPage.open();
    await productsPage.search(productsData.nonexistentSearch);

    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    await expect(productsPage.resultCards()).toHaveCount(0);
  });

  test('keeps the catalog available for an empty search @regression', async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.search('');

    await expect(productsPage.resultCards().first()).toBeVisible();
  });

  test('views products by category and brand @regression', async ({ productsPage, page }) => {
    await productsPage.open();
    await productsPage.selectCategory(productsData.category);
    await expect(page).toHaveURL(/\/category_products\/\d+/);
    await expect(page.getByRole('heading', { name: /Women - .+ Products/ })).toBeVisible();

    await productsPage.open();
    await productsPage.selectBrand(productsData.brand);
    await expect(page).toHaveURL(/\/brand_products\/Polo/);
    await expect(page.getByRole('heading', { name: /Polo Products/ })).toBeVisible();
  });
});