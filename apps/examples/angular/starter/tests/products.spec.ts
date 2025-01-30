import { expect, test } from '@playwright/test';

test.describe('UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Products');
  });
});

test.describe('Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('add product', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new item' }).click();

    await page.getByPlaceholder('Enter product title').fill('Product title');
    await page.getByPlaceholder('Enter product title').press('Tab');

    await page.getByLabel('Price').fill('123');
    await page.getByLabel('Price').press('Tab');

    await page.getByLabel('Description').fill('Description');
    await page.getByLabel('Description').press('Tab');

    await page.getByRole('button', { name: 'Save changes' }).press('Enter');

    const successToast = page.locator('[data-sonner-toast=""]');
    await expect(successToast).toBeVisible();
  });
});
