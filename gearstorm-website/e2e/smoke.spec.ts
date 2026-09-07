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
      page.getByRole('heading', { name: 'What is GearStorm?' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /switch to (dark|light) mode/i })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /register your team/i }).first()
    ).toBeDisabled();
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
      page.getByRole('heading', { level: 1, name: 'Rules' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /download full rulebook \(pdf\)/i })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Beginner', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Advanced', exact: true })
    ).toBeVisible();

    await page.goto('/timeline');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Timeline' })
    ).toBeVisible();

    await page.goto('/bot-specs');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Bot Specifications' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Beginner', exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Advanced', exact: true })
    ).toBeVisible();

    await page.goto('/gallery');
    await expect(page).toHaveURL(/\/#from-1-0$/);
    await expect(
      page.getByRole('heading', { name: 'GearStorm 1.0', exact: true })
    ).toBeVisible();
    await expect(page.locator('#from-1-0')).toBeInViewport();

    await page.goto('/contact');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Contact' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /organiser details/i })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /load campus map/i })
    ).toBeVisible();
    await expect(page.locator('iframe')).toHaveCount(0);
  });

  test('register page is closed until entries open', async ({ page }) => {
    await page.goto('/register');
    await expect(
      page.getByRole('heading', { name: /team registration/i })
    ).toBeVisible();
    await expect(page.getByText(/registration is closed/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /submit registration/i })
    ).toHaveCount(0);
  });

  test('skip link targets main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /skip to content/i });
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('theme toggle switches html class', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', {
      name: /switch to (dark|light) mode/i,
    });
    await expect(toggle).toBeVisible();
    const before = await page.locator('html').getAttribute('class');
    await toggle.click();
    const after = await page.locator('html').getAttribute('class');
    expect(after).not.toBe(before);
    expect(after ?? '').toMatch(/\b(light|dark)\b/);
  });
});
