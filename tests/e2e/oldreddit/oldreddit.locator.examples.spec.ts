import { test, expect } from '@playwright/test';
import { OldReddit } from '../../../pages/old_reddit';

const OLDPLACE = 'Eugene';

test.beforeEach(async ({ page }) => {
    await page.goto('http://old.reddit.com')
    const oldPage = new OldReddit(page);
});

test.describe('old reddit search', () => {
    test('css selectors, locate with class', async ( { page } ) => {
        // element dot class
        await expect(page.locator('span.listingsignupbar__cta-button')).toBeVisible();
    })

    test('css selectors, locate with an ID', async ( { page } ) => {
        // element 
        await expect(page.locator('#siteTable')).toBeVisible();
    })

});
