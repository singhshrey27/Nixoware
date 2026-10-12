const { test, expect } = require('@playwright/test');

const servicePaths = ['/web-development', '/mobile-app-development', '/software-development', '/ecommerce-development', '/ui-ux-design', '/cloud-solutions', '/digital-marketing', '/website-maintenance'];

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|analytics\.ahrefs\.com/, route => route.abort());
});

test('services catalogue exposes all eight routes and matching structured data', async ({ page, request }) => {
  await page.goto('/services', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Software Development & IT Services in India | Nixoware');
  await expect(page.locator('h1')).toHaveText('Your next idea.Our next build.');
  await expect(page.locator('.studio-service-card')).toHaveCount(8);
  const links = await page.locator('.studio-service-card > a').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
  expect(links).toEqual(servicePaths);
  for (const href of servicePaths) expect((await request.get(href)).ok(), href).toBeTruthy();
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent())['@graph'];
  const items = graph.find(item => item['@type'] === 'ItemList').itemListElement;
  expect(items.map(item => item.url)).toEqual(servicePaths.map(href => `https://www.nixoware.com${href}`));
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.nixoware.com/services');
});

test('explore, photo cards, keyboard focus, and portfolio actions work', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/services', { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'Explore services', exact: true }).click();
  await expect(page).toHaveURL(/#page-offerings$/);
  const customSoftware = page.getByRole('link', { name: 'Explore Custom Software', exact: true });
  await customSoftware.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(customSoftware).toBeFocused();
  expect(await customSoftware.evaluate(anchor => getComputedStyle(anchor).outlineStyle)).not.toBe('none');
  await customSoftware.press('Enter');
  await expect(page).toHaveURL(/\/software-development$/);
  await expect(page.locator('main h1')).toBeVisible();
  await page.goto('/services', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.studio-conversation .studio-button')).toHaveAttribute('href', 'https://wa.me/message/EQ2FP6REOCZXN1');
  await page.getByRole('link', { name: 'See our work', exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(page.locator('main h1')).toBeVisible();
  expect(errors).toEqual([]);
});

test('service images load and responsive card content stays within the page', async ({ page, isMobile }) => {
  await page.goto('/services', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.studio-hero')).toHaveCSS('background-color', 'rgb(4, 54, 74)');
  await expect(page.locator('.studio-hero .studio-button')).toHaveCSS('background-color', 'rgb(8, 198, 219)');
  await expect(page.locator('.studio-hero h1 span').last()).toHaveCSS('color', 'rgb(18, 220, 237)');
  const columns = await page.locator('.studio-service-grid').evaluate(grid => getComputedStyle(grid).gridTemplateColumns.split(' ').length);
  expect(columns).toBe(isMobile ? 1 : 2);
  for (const card of await page.locator('.studio-service-card').all()) {
    await card.scrollIntoViewIfNeeded();
    await expect.poll(() => card.locator('img').evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
    const bounds = await card.evaluate(element => {
      const outer = element.getBoundingClientRect();
      const text = element.querySelector('.studio-service-link').getBoundingClientRect();
      return { bottom: text.bottom, cardBottom: outer.bottom };
    });
    expect(bounds.bottom).toBeLessThanOrEqual(bounds.cardBottom);
  }
  const widths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, page: document.documentElement.scrollWidth }));
  expect(widths.page).toBeLessThanOrEqual(widths.viewport);
  await expect(page.locator('.services-studio-header')).toBeVisible();
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.locator('#primary-navigation')).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  }
});
