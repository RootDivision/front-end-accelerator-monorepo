import { expect, test } from '@playwright/test';

test.describe('UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Dashboard');
  });

  test('toggle sidebar', async ({ page }) => {
    const sidebar = page.getByTestId('sidebar');
    const toggleButton = page.getByRole('button', { name: 'Toggle Sidebar' });

    await expect(sidebar).toHaveClass(/.*w-64.*/);
    await toggleButton.click();

    await expect(sidebar).toHaveClass(/.*w-\[56px\].*/);

    await toggleButton.click();
    await expect(sidebar).toHaveClass(/.*w-64.*/);
  });

  test('toggle light dark mode', async ({ page }) => {
    const html = page.locator('html');
    let className;

    await page.getByLabel('light').click();
    await page.getByRole('option', { exact: true, name: 'dark' }).click();
    className = await html.getAttribute('class');
    expect(className).toContain('dark');

    await page.getByLabel('dark').click();
    await page.getByRole('option', { exact: true, name: 'light' }).click();
    className = await html.getAttribute('class');
    expect(className).toContain('light');
  });
});
