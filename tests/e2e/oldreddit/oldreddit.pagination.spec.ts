import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // start the test at page two
    await page.goto('http://old.reddit.com')
    await page.locator('div[role="banner"] >> text=worldnews').click();
    await page.locator('div[role="banner"] >> text=top').click();
    await page.locator('text=next ›').click();
});

test.describe('Pagination', async () => {
    test('Paginate forward', async ({ page }) => {
        await page.locator('text=next ›').click();
        expect(page.url()).toContain('count=50')
        expect(page.url()).toContain('after=')

    });
    test('Paginate backward', async ({ page }) => {
        await page.locator('text=‹ prev').click();
        expect(page.url()).toContain('count=26')
        expect(page.url()).toContain('before=')
    });
})