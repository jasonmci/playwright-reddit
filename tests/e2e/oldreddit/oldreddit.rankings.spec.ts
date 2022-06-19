import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://old.reddit.com')
    await page.locator('div[role="banner"] >> text=worldnews').click();
    await page.locator('div[role="banner"] >> text=top').click();
});

test.describe('oldreddit page rankings', async () => {
    test('descending by vote totals', async ( { page }) => {
        const rows = page.locator('//div[@data-promoted="false"]>> div.unvoted');
        const scrubbedVotesList = await voteCollector(rows);
        expect(descSorted(scrubbedVotesList)).toBeTruthy();
    });

    test('descending after changing date range', async ( { page }) => {
        await page.locator('text=past 24 hours').click();
        await page.locator('text=past week').click();
        await expect(page).toHaveURL('https://old.reddit.com/r/worldnews/top/?sort=top&t=week');
        const rows = page.locator('//div[@data-promoted="false"]>> div.unvoted');
        const scrubbedVotesList = await voteCollector(rows);
        expect(descSorted(scrubbedVotesList)).toBeTruthy();
    })

});

// simple verification of sort descending
async function descSorted(arr: any){
    let second_idx: number;
	for(let first_idx = 0; first_idx < arr.length; first_idx++){
  	  second_idx = first_idx + 1;
      if(arr[first_idx] - arr[second_idx] < 0) return false;
    }
    return true;
}

async function voteCollector(rows) {
    const count = await rows.count();
    const votesList = [];
    for (let i = 0; i < count; ++i)
        votesList.push(await rows.nth(i).getAttribute('title'));
    // scrub out the nulls the verify descending
    const scrubbedVotesList = votesList.filter(Number);
    return scrubbedVotesList;
}

