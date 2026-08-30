import { expect, test, type Page } from '@playwright/test';

const openMobileNavIfNeeded = async (page: Page): Promise<void> => {
  const openMenu = page.getByRole('button', { name: /open menu/i });
  if (await openMenu.isVisible()) {
    await openMenu.click();
    await expect(
      page.getByRole('navigation', { name: /mobile navigation/i })
    ).toBeVisible();
  }
};

test.describe('GearStorm smoke', () => {
  test('home renders brand and primary CTA', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: 'GearStorm 2.0' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /register now/i }).first()
    ).toBeVisible();
  });

  test('primary nav reaches content pages', async ({ page }) => {
    await page.goto('/');
    await openMobileNavIfNeeded(page);

    await page
      .getByRole('navigation', { name: /main navigation|mobile navigation/i })
      .getByRole('link', { name: 'Rules' })
      .first()
      .click();
    await expect(
      page.getByRole('heading', { level: 1, name: 'Rules & Regulations' })
    ).toBeVisible();

    await page.goto('/bot-specs');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Bot Specifications' })
    ).toBeVisible();

    await page.goto('/contact');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Contact' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /send message/i })
    ).toBeVisible();
  });

  test('register page shows validation form', async ({ page }) => {
    await page.goto('/register');
    await expect(
      page.getByRole('heading', { name: /team registration/i })
    ).toBeVisible();
    await page.getByRole('button', { name: /submit registration/i }).click();
    await expect(page.getByRole('alert').first()).toBeVisible();
  });

  test('skip link targets main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /skip to content/i });
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });
});
