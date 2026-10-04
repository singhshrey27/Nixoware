const { test, expect } = require('@playwright/test');

const routes = ['/', '/about', '/services', '/web-development', '/portfolio', '/blog', '/contact'];

test.describe('Nixoware routes', () => {
  for (const route of routes) {
    test(`${route} renders the shared theme`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toContainText('Nixoware');
      await expect(page.locator('.site-header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('.seo-header, .home-header')).toBeVisible();
    });
  }
});

test('mobile navigation opens and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'This interaction is specific to the mobile project.');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const menuButton = page.locator('.menu-button');
  const navigation = page.locator('#primary-navigation');
  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.evaluate(button => button.click());
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toHaveClass(/open/);
  await menuButton.evaluate(button => button.click());
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});
