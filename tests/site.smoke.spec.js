const { test, expect } = require('@playwright/test');
const path = require('node:path');
const os = require('node:os');

async function captureCostGuideScreenshot(page, testInfo, slug) {
  if (process.env.CAPTURE_GUIDE_SCREENSHOTS !== '1') return;
  await page.locator('.article-cost-table').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(os.tmpdir(), `nixoware-${slug}-${testInfo.project.name}.png`) });
}

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
  await expect(menuButton.locator('span')).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(menuButton.locator('span').nth(index)).toBeVisible();
  }
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.evaluate(button => button.click());
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toHaveClass(/open/);
  const closeIconCenters = () => menuButton.locator('span').evaluateAll(([first, , last]) => {
    const center = element => {
      const { top, height } = element.getBoundingClientRect();
      return top + height / 2;
    };
    return Math.abs(center(first) - center(last));
  });
  await expect.poll(closeIconCenters).toBeLessThan(1);
  await menuButton.evaluate(button => button.click());
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('mobile services capability cards use compact spacing and typography', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'This layout check is specific to the mobile project.');
  await page.goto('/services', { waitUntil: 'domcontentloaded' });
  const card = page.locator('.seo-card-section:not(.seo-faq) .seo-cards article').first();
  await expect(card).toBeVisible();
  const metrics = await card.evaluate(element => ({
    headingSize: parseFloat(getComputedStyle(element.querySelector('h3')).fontSize),
    bodySize: parseFloat(getComputedStyle(element.querySelector('p')).fontSize),
    height: element.getBoundingClientRect().height,
    radius: getComputedStyle(element).borderRadius
  }));
  expect(metrics.headingSize).toBeLessThanOrEqual(20);
  expect(metrics.bodySize).toBeLessThanOrEqual(15);
  expect(metrics.height).toBeLessThan(180);
  expect(metrics.radius).toBe('12px');
  const menuButton = page.locator('.menu-button');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#primary-navigation')).toHaveClass(/open/);
});

test('website cost guide exposes its pricing table, FAQs, schema, and service links', async ({ page }, testInfo) => {
  await page.goto('/blog/website-development-cost-in-india', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('Website Development Cost in India');
  await expect(page.locator('.article-cost-table table tbody tr')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'Template website vs custom website: how the price changes' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How much does an e-commerce website cost in India?' })).toBeVisible();
  await expect(page.locator('.article-content-links a[href="/web-development"]')).toBeVisible();
  const articleSchema = await page.locator('script[type="application/ld+json"]').first().textContent();
  const articleGraph = JSON.parse(articleSchema)['@graph'];
  expect(articleGraph.find(item => item['@type'] === 'Article').headline).toContain('Website Development Cost in India');
  await captureCostGuideScreenshot(page, testInfo, 'website-cost');
});

test('mobile app cost pillar covers the keyword cluster and calculator interaction', async ({ page }, testInfo) => {
  await page.goto('/blog/mobile-app-development-cost-guide', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('Mobile App Development Cost in India');
  await expect(page.locator('.article-cost-table table tbody tr')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'Android app development cost vs iOS app development cost' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cross-platform app development cost: Flutter vs React Native' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'App development quotation: how to compare vendors' })).toBeVisible();
  await expect(page.locator('.article-content-links a[href="/mobile-app-development"]')).toBeVisible();
  const estimate = page.locator('.app-cost-calculator-result strong');
  const initialEstimate = await estimate.textContent();
  await page.getByText('Fintech', { exact: true }).click();
  await expect(estimate).not.toHaveText(initialEstimate);
  const layoutWidths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth }));
  expect(layoutWidths.document).toBeLessThanOrEqual(layoutWidths.viewport);
  await captureCostGuideScreenshot(page, testInfo, 'app-cost');
});

test('Balrampur local hub links the supporting topical cluster', async ({ page }) => {
  await page.goto('/blog/website-development-in-balrampur-uttar-pradesh', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toContainText('Website Development in Balrampur');
  for (const slug of [
    'website-development-cost-in-balrampur',
    'mobile-app-development-in-balrampur',
    'software-development-company-in-balrampur',
    'ai-app-development-in-balrampur',
    'ecommerce-development-in-balrampur',
    'digital-marketing-in-balrampur',
    'seo-services-in-balrampur'
  ]) {
    await expect(page.locator(`.article-content-links a[href="/blog/${slug}"]`)).toBeVisible();
  }
});

test('Balrampur cluster guides render and link to relevant services and conversion paths', async ({ page }) => {
  const guides = [
    ['website-development-cost-in-balrampur', '/web-development'],
    ['mobile-app-development-in-balrampur', '/mobile-app-development'],
    ['software-development-company-in-balrampur', '/software-development'],
    ['ai-app-development-in-balrampur', '/software-development'],
    ['ecommerce-development-in-balrampur', '/ecommerce-development'],
    ['digital-marketing-in-balrampur', '/digital-marketing'],
    ['seo-services-in-balrampur', '/digital-marketing']
  ];

  for (const [slug, servicePath] of guides) {
    await page.goto(`/blog/${slug}`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.article-content-links a[href="/contact"]')).toBeVisible();
    await expect(page.locator(`.article-next-steps a[href="${servicePath}"]`)).toBeVisible();
  }
});
