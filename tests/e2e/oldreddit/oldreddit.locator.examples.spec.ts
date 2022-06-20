import { test, expect } from '@playwright/test';
import { OldReddit } from '../../../pages/old_reddit';

const OLDPLACE = 'Eugene';

test.beforeEach(async ({ page }) => {
    await page.goto('http://old.reddit.com')
    const oldPage = new OldReddit(page);
});

test.describe('old reddit element showcase', () => {
    test('css selectors, locate with class', async ( { page } ) => {
        // element dot class
        await expect(page.locator('span.listingsignupbar__cta-button')).toBeVisible();
    })

    test('css selectors, locate with an ID', async ( { page } ) => {
        // element id
        await expect(page.locator('#siteTable')).toBeVisible();
    })

    test('css selectors, locate the second article thumbnail', async ( { page } ) => {
        // in the siteTable ID, select the second matching thumbnail on the page
        await expect(page.locator('#siteTable :nth-match(a.thumbnail, 2 )')).toBeVisible();
    })

    test('save the second promoted article', async ( { page } ) => {
        // find the second promoted article and save it, then verify the Next button on the modal
        await page.locator(':nth-match(div[data-promoted=true], 2) >> li.save-button >> a ').click();
        await expect(page.locator('#desktop-onboarding-sign-up-form >> text=Next')).toBeVisible();
    })

});
