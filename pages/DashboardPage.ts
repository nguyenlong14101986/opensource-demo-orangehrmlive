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
 
    async verifyPageDisplay(): Promise<void> {
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        await expect(this.dashboardHeader).toBeVisible();
    }
 
    async navigateToAdminPage(): Promise<void> {
        await this.adminLink.click();
    }
}
