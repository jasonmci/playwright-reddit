import { expect, Locator, Page } from "@playwright/test";

export class NewReddit {
    readonly page: Page;
    readonly searchReddit: Locator;
    readonly searchTrigger: Locator;
    readonly communities: Locator;
    readonly community: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchReddit = page.locator('[placeholder="Search Reddit"]');
        this.communities = page.locator('[data-testid="tab_communities"] >> text=Communities');
    }

    async searchForPlace(place: any) {
        await this.searchReddit.click();
        await this.searchReddit.fill(`${place}`);
        await this.page.locator(`text=Search for “${place}”`).click();
        await expect(this.page).toHaveURL(`https://www.reddit.com/search/?q=${place}`);
    }

    async visitCommunities() {
        await this.communities.click();
    }

    async gotoCommunity(name: any) {
        await this.page.locator('h6', { hasText: `r/${name}`}).first().click(); 
    }

    async communityTitleIsVisible(name: any): Promise<boolean> {
        return await this.page.isVisible(`h1:has-text("${name}")`);
    }
}



