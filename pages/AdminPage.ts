import { expect, type Locator } from '@playwright/test';
import { WebUI } from '@lib/WebUI';
import { BasePage } from '@pages/BasePage';
 
export class AdminPage extends BasePage {
    readonly webUI: WebUI;
    readonly adminHeader: Locator;
    readonly usernameTextbox: Locator;
    readonly userRoleDropdown: Locator;
    readonly employeeNameTextbox: Locator;
    readonly statusDropdown: Locator;
    readonly searchButton: Locator;
    readonly usernameCell: Locator;
    readonly userRoleCell: Locator;
    readonly employeeNameCell: Locator;
    readonly statusCell: Locator;
    readonly alertPopup: Locator;
    readonly alertMessage: Locator;
    readonly errorMessage: Locator;
 
    constructor(page: any) {
        super(page);
        this.webUI = new WebUI(page);
        this.adminHeader = page.getByRole('heading', { name: 'Admin' });
        this.usernameTextbox = page.getByRole('textbox').nth(1);
        this.employeeNameTextbox = page.getByRole('textbox', { name: 'Type for hints...' });
        this.userRoleDropdown = page.locator('.oxd-select-text-input').first();
        this.statusDropdown = page.locator('.oxd-select-text-input').last();
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.usernameCell = page.locator('.oxd-table-body .oxd-table-card:nth-child(1) .oxd-table-cell:nth-child(2)');
        this.userRoleCell = page.locator('.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(3)');
        this.employeeNameCell = page.locator('.oxd-table-body .oxd-table-card:nth-child(1) .oxd-table-cell:nth-child(4)');
        this.statusCell = page.locator('.oxd-table-body .oxd-table-card:nth-child(1) .oxd-table-cell:nth-child(5)');
        this.alertPopup = page.locator('#oxd-toaster_1');
        this.alertMessage = page.locator('.oxd-toast-content-text').last();
        this.errorMessage = page.locator('.oxd-input-group__message');
    }
 
    async verifyPageDisplay() {
        await expect(this.adminHeader).toBeVisible();
    }
 
    async inputUsername(testData: any) {
        await this.usernameTextbox.fill(testData.username);
    }
 
    async inputEmployeeName(testData: any) {
        await this.employeeNameTextbox.fill(testData.employeeName);
    }
 
    async selectUserRoleOption(testData: any) {
        await this.webUI.selectDropdown(this.userRoleDropdown, testData.userRole)
    }
 
    async selectStatusOption(testData: any) {
        await this.webUI.selectDropdown(this.statusDropdown, testData.status)
    }
 
    async clickSearchButton() {
        await this.searchButton.click();
        await this.page.waitForLoadState();
    }
 
    async verifyUsernameCellDisplay(testData: any) {
        await expect(this.usernameCell).toBeVisible();
        await expect(this.usernameCell).toContainText(testData.expectedUsername);
    }
 
    async verifyUserRoleCellDisplay(testData: any) {
        const rowCount: number = await this.userRoleCell.count();
        console.log("count: " + rowCount)
        for (let i = 0; i < rowCount; i++) {
            await expect(this.userRoleCell.nth(i)).toBeVisible();
            await expect(this.userRoleCell.nth(i)).toContainText(testData.expectedRole);
        }
    }
 
    async verifyEmployeeCellDisplay(testData: any) {
        await expect(this.employeeNameCell).toBeVisible();
        await expect(this.employeeNameCell).toContainText(testData.expectedEmployeeName);
    }
 
    async verifyStatusCellDisplay(testData: any) {
        const rowCount: number = await this.statusCell.count();
        for (let i = 0; i < rowCount; i++) {
            await expect(this.statusCell.nth(i)).toBeVisible();
            await expect(this.statusCell.nth(i)).toContainText(testData.expectedStatus);
        }
    }
 
    async verifyAlert(testData: any) {
        await expect(this.alertPopup).toBeVisible();
        await expect(this.alertMessage).toContainText(testData.expectedAlert);
    }
 
    async verifyErrorMessage(testData: any) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(testData.expectedErrorMessage);
    }
}
