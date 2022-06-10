import { test, expect } from '@playwright/test';
import { OldReddit } from '../../pages/old_reddit';

const OLDPLACE = 'Seattle';

test.beforeEach(async ({ page }) => {
    await page.goto('http://old.reddit.com')
});

test.describe('old reddit search', () => {
    test('search for a region', async ( { page } ) => {
        const oldPage = new OldReddit(page);
        oldPage.searchForPlace(OLDPLACE);
        oldPage.gotoCommunity(OLDPLACE);
        await expect(page.locator(`div[role="banner"] >> text=${OLDPLACE}`)).toBeVisible();
    })

});
