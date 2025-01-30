import { expect, test } from '@playwright/test';

test.describe('UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts');
  });

  test('page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Posts');
  });
});

test.describe('Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts');
  });

  test('search', async ({ page }) => {
    await page.getByPlaceholder('Debounced async search with').click();
    await page.getByPlaceholder('Debounced async search with').fill('mother');
    await expect(page.getByRole('table')).toContainText('mother');
  });

  test('sortOptions', async ({ page }) => {
    await page.getByPlaceholder('Select a sort').click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page.getByText("'My dear Bounderby,' Mr.")).toBeVisible();

    await page.getByPlaceholder('Select a sort').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(
      page.getByText('So what is the answer? How can you stand'),
    ).toBeVisible();
  });

  test('orderOptions', async ({ page }) => {
    await page.getByPlaceholder('Select an order').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(page.getByText('251')).toBeVisible();
  });

  test('pagination', async ({ page }) => {
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('table')).toContainText(
      "It wasn't quite yet time to panic.",
    );

    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByRole('table')).toContainText(
      'His mother had always taught him',
    );
  });
});
