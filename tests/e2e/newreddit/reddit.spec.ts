import { test, expect } from '@playwright/test';
import { NewReddit } from '../../../pages/new_reddit';

const PLACE = 'Tacoma';

test.beforeEach(async ({ page }) => {
    await page.goto('http://www.reddit.com');
})

test.describe('New reddit tests', () => {
    test('search for a region', async ({ page }) => {
        const homePage = new NewReddit(page);
        await homePage.searchForPlace(PLACE);
        await homePage.visitCommunities();
        await expect(page).toHaveURL(`https://www.reddit.com/search/?q=${PLACE}&type=sr`);
        await homePage.gotoCommunity(PLACE);
        await expect(page).toHaveURL(`https://www.reddit.com/r/${PLACE}/`);
        expect (homePage.communityTitleIsVisible).toBeTruthy();
    })
})