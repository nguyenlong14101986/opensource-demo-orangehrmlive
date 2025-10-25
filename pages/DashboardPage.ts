import {expect, type Page, type Locator} from '@playwright/test';
import { BasePage } from '@pages/BasePage';
 
export class DashboardPage extends BasePage {
    readonly dashboardHeader: Locator;
    readonly adminLink: Locator;
 
    constructor(page: any) {
        super(page);
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
        this.adminLink = page.getByRole('link', { name: 'Admin' });
    }
 
    async verifyPageDisplay() {
        await expect(this.dashboardHeader).toBeVisible();
    }
 
    async navigateToAdminPage() {
        await this.adminLink.click();
    }
}
