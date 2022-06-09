import { expect, Locator, Page} from "@playwright/test";

export class OldReddit {
    readonly page: Page;
    readonly searchReddit: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.searchReddit = page.locator('[placeholder="search"]');
    }

    async searchForPlace(name: any) {
        await this.searchReddit.fill(name);
        await this.searchReddit.press('Enter');
    }

    async gotoCommunity(name: any) {
        await this.page.locator('mark', { hasText: `${name}`}).first().click();
    }

}