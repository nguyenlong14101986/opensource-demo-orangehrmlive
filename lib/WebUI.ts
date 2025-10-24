import {Locator, type Page } from '@playwright/test';
 
export class WebUI {
    page: Page;
 
    constructor(page: any) {
        this.page = page;
    }
 
    async selectDropdown(dropdown: Locator, option: string): Promise<void> {
        await dropdown.click();
        await this.page.locator(`.oxd-select-dropdown >> text=${option}`).click();
    }
}
