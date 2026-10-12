const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const os = require('node:os');

test('sitemap, robots, canonicals, and schema use the preferred HTTPS www origin', async ({ request }) => {
  const sitemapResponse = await request.get('/sitemap.xml');
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  expect(locations.length).toBeGreaterThan(10);
  expect(locations.every(url => url.startsWith('https://www.nixoware.com/'))).toBeTruthy();
  expect(sitemap).not.toContain('https://nixoware.com');
  const imageLocations = [...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(match => match[1]);
  expect(imageLocations.length).toBeGreaterThan(10);
  for (const url of imageLocations) {
    expect(fs.existsSync(path.join(__dirname, '../public', new URL(url).pathname)), url).toBeTruthy();
  }
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('https://www.nixoware.com/sitemap.xml');
  for (const route of ['/', '/web-development', '/software-development', '/blog/website-development-cost-in-india', '/portfolio/teknolab-website']) {
    const response = await request.get(route);
    expect(response.ok(), route).toBeTruthy();
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    expect(canonical, route).not.toBeNull();
    expect(new URL(canonical[1]).href).toBe(new URL(`https://www.nixoware.com${route}`).href);
    expect(html).not.toContain('https://nixoware.com');
  }
});

test('public host/protocol variants redirect once and preserve the path and campaign query', async ({ request }) => {
  for (const [host, protocol] of [['nixoware.com', 'https'], ['www.nixoware.com', 'http']]) {
    const response = await request.get('/blog/website-development-cost-in-india?utm_source=instagram', {
      headers: { 'x-forwarded-host': host, 'x-forwarded-proto': protocol },
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe('https://www.nixoware.com/blog/website-development-cost-in-india?utm_source=instagram');
  }
  const preferred = await request.get('/web-development', {
    headers: { 'x-forwarded-host': 'www.nixoware.com', 'x-forwarded-proto': 'https' },
    maxRedirects: 0,
  });
  expect(preferred.status()).toBe(200);
});

test('homepage cost links reach existing articles and service metadata has one brand suffix', async ({ page, request }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const links = await page.locator('.growth-guide').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
  expect(links).toEqual(['/blog/website-development-cost-in-india', '/blog/mobile-app-development-cost-guide', '/blog/software-development-cost-in-india']);
  for (const href of links) expect((await request.get(href)).ok()).toBeTruthy();
  for (const route of ['/web-development', '/software-development']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/in India \| Nixoware$/);
    expect((await page.title()).match(/\| Nixoware/g)).toHaveLength(1);
    expect((await page.locator('meta[property="og:title"]').getAttribute('content')).match(/\| Nixoware/g)).toHaveLength(1);
  }
});

test('cost articles surface service links and prefer relevant related guides', async ({ page }, testInfo) => {
  await page.route(/googletagmanager\.com|analytics\.ahrefs\.com/, route => route.abort());
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [slug, service] of [['website-development-cost-in-india', '/web-development'], ['mobile-app-development-cost-guide', '/mobile-app-development'], ['software-development-cost-in-india', '/software-development']]) {
    await page.goto(`/blog/${slug}`, { waitUntil: 'domcontentloaded' });
    const earlyLink = page.locator(`.article-body > p a[href="${service}"]`);
    await expect(earlyLink).toBeVisible();
    expect(await page.locator('.article-related a').first().getAttribute('href')).toMatch(/^\/blog\//);
    const width = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
    expect(width.content).toBeLessThanOrEqual(width.viewport);
    await earlyLink.click();
    await expect(page).toHaveURL(new RegExp(`${service}$`));
    await expect(page.locator('main h1')).toBeVisible();
  }
  expect(errors).toEqual([]);
  if (process.env.CAPTURE_SEO_SCREENSHOTS === '1') {
    await page.goto('/blog/software-development-cost-in-india', { waitUntil: 'domcontentloaded' });
    await page.locator('.article-body > p').scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(os.tmpdir(), `nixoware-seo-${testInfo.project.name}.png`) });
  }
});

test('contact and service clicks queue separate events without personal details', async ({ page }) => {
  await page.route(/googletagmanager\.com|analytics\.ahrefs\.com/, route => route.abort());
  await page.goto('/blog/website-development-cost-in-india?customer_email=private@example.com', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.gtag === 'function');
  await page.evaluate(() => {
    window.dataLayer.length = 0;
    document.addEventListener('click', event => event.preventDefault());
  });
  await page.locator('.article-body > p a[href="/web-development"]').click();
  await page.locator('.article-next-steps a[href^="https://wa.me/"]').click();
  const events = await page.evaluate(() => window.dataLayer.map(item => Array.from(item)).filter(item => item[0] === 'event'));
  expect(events.map(item => item[1])).toEqual(['service_click', 'contact_click']);
  expect(events[0][2]).toMatchObject({ destination_path: '/web-development', placement: 'article', content_group: 'article' });
  expect(events[1][2]).toMatchObject({ contact_method: 'whatsapp', content_group: 'article' });
  expect(events.every(item => item[2].page_path === '/blog/website-development-cost-in-india')).toBeTruthy();
  expect(JSON.stringify(events)).not.toContain('private@example.com');
  expect(JSON.stringify(events)).not.toContain('wa.me');
});

test('tracking queues before GA loads and fails safely if analytics is unavailable', async () => {
  const source = fs.readFileSync(path.join(__dirname, '../lib/analytics.js'), 'utf8').replace(/export function /g, 'function ');
  const window = { location: { pathname: '/contact', href: 'http://localhost:3000/contact' } };
  const context = { window, URL };
  vm.createContext(context);
  vm.runInContext(source + '\nglobalThis.send = trackEvent; globalThis.click = trackLinkClick;', context);
  context.send('generate_lead', { lead_source: 'website_form', form_id: 'project_enquiry' });
  expect(Array.from(window.dataLayer[0]).slice(0, 2)).toEqual(['event', 'generate_lead']);
  window.gtag = () => { throw new Error('Analytics blocked'); };
  expect(() => context.send('generate_lead')).not.toThrow();
  delete context.window;
  expect(() => context.send('generate_lead')).not.toThrow();
});

test('SEO development guide exposes a usable checklist, contextual resources, and service navigation', async ({ page }, testInfo) => {
  await page.route(/googletagmanager\.com|analytics\.ahrefs\.com/, route => route.abort());
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/blog/seo-friendly-website-development-guide', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('SEO-Friendly Website Development: A Launch Checklist | Nixoware');
  await expect(page.locator('h1')).toHaveText('SEO-Friendly Website Development: A Launch Checklist');
  await expect(page.locator('.article-checklist li')).toHaveCount(12);
  await page.locator('.article-body nav a[href="#article-checklist-title"]').click();
  await expect(page).toHaveURL(/#article-checklist-title$/);
  await expect(page.locator('#article-checklist-title')).toBeVisible();
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent())['@graph'];
  expect(graph.find(item => item['@type'] === 'FAQPage').mainEntity).toHaveLength(5);
  for (const href of ['/web-development', '/blog/website-development-cost-in-india', '/website-maintenance']) {
    await expect(page.locator(`.article-content-links a[href="${href}"]`)).toBeVisible();
  }
  const widths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  if (process.env.CAPTURE_SEO_SCREENSHOTS === '1') {
    await page.locator('.article-checklist').scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(os.tmpdir(), `nixoware-checklist-${testInfo.project.name}.png`) });
  }
  await page.locator('.article-body > p a[href="/web-development"]').click();
  await expect(page).toHaveURL(/\/web-development$/);
  await expect(page.locator('main h1')).toBeVisible();
  expect(errors).toEqual([]);
});

test('homepage local guides connect the leading articles to service pages', async ({ page, request }, testInfo) => {
  await page.route(/googletagmanager\.com|analytics\.ahrefs\.com/, route => route.abort());
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const localLinks = await page.locator('.growth-local a').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));
  expect(localLinks).toEqual(['/blog/website-development-in-balrampur-uttar-pradesh', '/blog/ai-agriculture-app-development-balrampur']);
  if (process.env.CAPTURE_SEO_SCREENSHOTS === '1') {
    await page.locator('.growth-local').scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(os.tmpdir(), `nixoware-local-guides-${testInfo.project.name}.png`) });
  }
  for (const [href, service] of [[localLinks[0], '/web-development'], [localLinks[1], '/mobile-app-development']]) {
    expect((await request.get(href)).ok()).toBeTruthy();
    await page.goto(href, { waitUntil: 'domcontentloaded' });
    await page.locator(`.article-body > p a[href="${service}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${service}$`));
    await expect(page.locator('main h1')).toBeVisible();
  }
});
