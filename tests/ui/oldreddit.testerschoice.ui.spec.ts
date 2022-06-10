//writing an addition test, my choice
import { test, expect } from '@playwright/test';

const TROPHIES = [ 'Four-Year Club', 'ComboLinker', 'Wearing is Caring', '100 Awards Club', 'Verified Email']

test.beforeEach(async ({ page }) => {
    await page.goto('http://old.reddit.com')
    await page.locator('text=users').click();
    await page.locator('text=u/nasa').click();
    await expect(page).toHaveURL('https://old.reddit.com/user/nasa/');
});

test.describe('NASAs trophy case', () => {
    for (const trophy of TROPHIES) {
        test(`should display trophy ${trophy} in the trophy case`, async ({ page }) => {
            await expect(page.locator(`text="${trophy}"`)).toBeVisible();
        }
    )}
});