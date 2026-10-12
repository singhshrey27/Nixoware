const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager|analytics\.ahrefs/, route => route.abort());
});

test('new artwork has responsive sources, intrinsic dimensions, and loading priorities', async ({ page, isMobile }) => {
  await page.goto('/services');
  const hero = page.locator('.studio-hero-photo img');
  await expect(hero).toHaveAttribute('src', '/visuals/v2/services.webp');
  await expect(hero).toHaveAttribute('srcset', /640w.*1024w.*1536w/);
  await expect(hero).toHaveAttribute('width', '1536');
  await expect(hero).toHaveAttribute('height', '1024');
  await expect(hero).toHaveAttribute('loading', 'eager');
  await expect(hero).toHaveAttribute('fetchpriority', 'high');
  const card = page.locator('.studio-service-card').first();
  const image = card.locator('img');
  await expect(image).toHaveAttribute('loading', 'lazy');
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBeTruthy();
  expect(await image.evaluate(img => img.currentSrc)).toMatch(/\/visuals\/v2\/website(?:-640|-1024)?\.webp$/);
  if (isMobile) {
    const boxes = await card.evaluate(el => ({ image: el.querySelector('img').getBoundingClientRect().toJSON(), title: el.querySelector('h3').getBoundingClientRect().toJSON() }));
    expect(boxes.image.bottom).toBeLessThan(boxes.title.top);
  }
});

test('client evidence stays original and native back-to-top works on long pages', async ({ page }) => {
  await page.goto('/');
  const proof = page.locator('.proof-group').first();
  await expect(proof.locator('img').first()).toHaveAttribute('src', '/client-proof/pune-education-forum-website.webp');
  await expect(proof.locator('img').last()).toHaveAttribute('src', '/client-proof/teknolab-website.webp');
  for (const image of await page.locator('.proof-group img').all()) {
    await expect(image).toHaveAttribute('loading', 'eager');
    await expect.poll(() => image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
  }
  await page.goto('/blog/5000-vs-50000-website-cost-india');
  const back = page.getByRole('link', {name:'Back to top', exact:true});
  await back.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(1000);
  await back.focus();
  await expect(back).toBeFocused();
  expect(await back.evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
  await back.press('Enter');
  await expect(page).toHaveURL(/#top$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(100);
});

test('reduced motion and FAQ highlighting remain accessible', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const card = page.locator('.capability-list>article').first();
  await expect(card).toHaveCSS('transition-duration', '0s');
  await expect(card.locator('img')).toHaveCSS('transition-duration', '0s');
  const faq = page.locator('.homepage-faq-list details').first();
  await faq.locator('summary').click();
  await expect(faq).toHaveAttribute('open', '');
  await expect(faq).toHaveCSS('background-color', 'rgb(244, 252, 253)');
  await expect(faq.locator('p')).toBeVisible();
});
