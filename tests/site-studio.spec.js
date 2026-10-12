const { test, expect } = require('@playwright/test');

const routes = ['/', '/about', '/services', '/web-development', '/website-maintenance', '/mobile-app-development', '/software-development', '/ecommerce-development', '/ui-ux-design', '/cloud-solutions', '/digital-marketing', '/contact', '/portfolio', '/case-studies', '/blog', '/blog/5000-vs-50000-website-cost-india', '/portfolio/teknolab-website'];

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager|analytics\.ahrefs/, route => route.abort());
});

test.describe('shared services-page visual system', () => {
  for (const route of routes) test(`${route} keeps colours, font, chrome, and imagery`, async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response.ok(), route).toBeTruthy();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.unified-header')).toHaveCSS('background-color', 'rgb(1, 27, 40)');
    await expect(page.locator('.unified-footer')).toHaveCount(1);
    await expect(page.locator('body')).toHaveClass('nixoware-site');
    await expect(page.locator('h1')).toHaveCSS('font-weight', '800');
    const image = page.locator('.home-hero img, .page-hero-visual img, .studio-hero-photo img, .article-featured-image img, .portfolio-detail-image img').first();
    await image.scrollIntoViewIfNeeded();
    const bounds = await image.boundingBox();
    expect(bounds.width, `${route} hero image width`).toBeGreaterThan(200);
    expect(bounds.height, `${route} hero image height`).toBeGreaterThan(150);
    await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0), {message: route}).toBeTruthy();
    const widths = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(widths[0], route).toBeLessThanOrEqual(widths[1]);
  expect(errors).toEqual([]);
  });
});

test('client marquee uses genuine project links and supports pause, resume, and reduced motion', async ({ page }) => {
  await page.goto('/');
  const showcase = page.locator('.client-proof-marquee');
  await showcase.scrollIntoViewIfNeeded();
  const groups = showcase.locator('.proof-group');
  await expect(groups).toHaveCount(3);
  await expect(groups.first().locator('a')).toHaveCount(2);
  await expect(groups.first().locator('a').first()).toHaveAttribute('href', '/portfolio/pune-education-forum-website');
  await expect(groups.first().locator('a').last()).toHaveAttribute('href', '/portfolio/teknolab-website');
  await expect(groups.nth(1)).toHaveAttribute('aria-hidden', 'true');
  await expect(groups.nth(1)).toHaveAttribute('inert', '');
  for (const image of await groups.first().locator('img').all()) {
    await expect.poll(() => image.evaluate(element=>element.complete && element.naturalWidth > 0)).toBeTruthy();
  }
  await page.getByRole('button', {name:'Pause client showcase'}).click();
  await expect(showcase.locator('.proof-track')).toHaveCSS('animation-play-state','paused');
  await expect(page.getByRole('button', {name:'Resume client showcase'})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button', {name:'Resume client showcase'}).click();
  await expect(page.getByRole('button', {name:'Pause client showcase'})).toHaveAttribute('aria-pressed','false');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(showcase.locator('.proof-track')).toHaveCSS('animation-name','none');
  await expect(groups.nth(1)).not.toBeVisible();
  await groups.first().locator('a').first().click();
  await expect(page).toHaveURL(/\/portfolio\/pune-education-forum-website$/);
});

test('homepage image cards expand capabilities and lead to the corresponding service', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.capability-list>article');
  await expect(cards).toHaveCount(6);
  await expect(page.locator('.studio-journey h3').first()).toHaveCSS('color', 'rgb(6, 43, 58)');
  await expect(page.locator('.homepage-social h2')).toHaveCSS('color', 'rgb(6, 43, 58)');
  for (const card of await cards.all()) {
    await card.scrollIntoViewIfNeeded();
    await expect.poll(() => card.locator('img').evaluate(image=>image.complete&&image.naturalWidth>0)).toBeTruthy();
    await expect(card.locator('h3')).toBeVisible();
  }
  const first = cards.first();
  await first.locator('summary').click();
  await expect(first.locator('details')).toHaveAttribute('open','');
  await expect(first.locator('details p')).toBeVisible();
  await first.getByRole('link', {name:'Explore Website Development'}).click();
  await expect(page).toHaveURL(/\/web-development$/);
  await expect(page.locator('#primary-navigation a[href="/services"]')).toHaveAttribute('aria-current', 'location');
});

test('service FAQs expand and contact options are actionable', async ({ page }) => {
  await page.goto('/web-development');
  const faq = page.locator('.seo-faq-list details').nth(1);
  await faq.locator('summary').click();
  await expect(faq.locator('p')).toBeVisible();
  await page.goto('/contact');
  await expect(page.locator('.seo-cards a[href="tel:+919650429575"]')).toBeVisible();
  await expect(page.locator('.seo-cards a[href="mailto:nixoware@gmail.com"]')).toBeVisible();
});

test('editorial title has readable contrast and related guides use images', async ({ page }) => {
  await page.goto('/blog/5000-vs-50000-website-cost-india');
  await expect(page.locator('.article-header h1')).toHaveCSS('color', 'rgb(6, 43, 58)');
  await expect(page.locator('.article-related-image img')).toHaveCount(3);
  await page.locator('.article-related a').first().click();
  await expect(page.locator('main h1')).toBeVisible();
});
