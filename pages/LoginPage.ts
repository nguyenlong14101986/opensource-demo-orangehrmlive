import {expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
 
export class LoginPage extends BasePage {
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly alertMessage: Locator;
    readonly errorLoginField: Locator;
    readonly errorPasswordField: Locator;
 
    constructor(page: any) {
        super(page);
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.alertMessage = page.getByText('Invalid credentials');
        this.errorLoginField = page.locator('.oxd-input-group__message').first();
        this.errorPasswordField = page.locator('.oxd-input-group__message').last();
    }
 
    async verifyPageDisplay() {
        await expect(this.loginButton).toBeVisible();
    }
 
    async navigateToLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
 
    async login(testData: any) {
        await this.usernameTextbox.fill(testData.username);
        await this.passwordTextbox.fill(testData.password);
        await this.loginButton.click();
    }
 
    async verifyInvalidLogin() {
        await expect(this.alertMessage).toBeVisible();
        await expect(this.alertMessage).toHaveText('Invalid credentials');
    }

    async verifyRequiredFieldErrorShown() {
        await expect(this.errorLoginField).toBeVisible();
        await expect(this.errorLoginField).toHaveText('Required');
        await expect(this.errorPasswordField).toBeVisible();
        await expect(this.errorPasswordField).toHaveText('Required');
    }
}
