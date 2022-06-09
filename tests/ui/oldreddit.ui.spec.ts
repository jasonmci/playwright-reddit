import { test, expect, Page } from '@playwright/test';
import { OldReddit } from '../../pages/old_reddit';

const COMMUNITIES = ['ASKREDDIT', 'NEWS', 'WORLDNEWS'];
const OTHERSUBS = ['RELATED', 'N. AMERICA', 'S. AMERICA', 'EUROPE', 'ASIA', 'MIDDLE EAST', 'AFRICA', 'OCEANIA']
const USHOVERSUBS = ['/r/Politics', '/r/USA']

test.beforeEach(async ({ page }) => {
    await page.goto('http://old.reddit.com')
});

test.describe('old reddit ui checks', () => {
    for (const community of COMMUNITIES) {
        test(`Checking for the ${community} community`, async ({ page }) => {
            await expect(page.locator(`div[role="banner"] >> text=${community}`)).toBeVisible();
        })
    }

    for (const othersub of OTHERSUBS) {   
        test(`Checking for ${othersub} in the Other Subs section`, async ({ page }) => {
            await page.locator('text=worldnews').click();
            await expect(page).toHaveURL('https://old.reddit.com/r/worldnews/');
            await expect(page.locator(`text=${othersub}`)).toBeVisible();
        })
    }   

    for (const othersub of USHOVERSUBS) { 
        test(`Hover on N. America and check for ${othersub} `, async ({ page }) => {
            await page.locator('text=worldnews').click();
            await page.locator('text=N. America').hover()
            await expect(page.locator('a', { hasText: `${othersub}` })).toBeVisible();
        })
    }
});