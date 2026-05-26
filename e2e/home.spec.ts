import { expect, test } from '@playwright/test';

test('home page renders localized title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('switching to english locale works', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { name: 'Top Kvartiri' })).toBeVisible();
});
