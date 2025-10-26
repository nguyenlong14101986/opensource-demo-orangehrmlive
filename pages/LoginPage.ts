import {expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { CryptoHelper } from '@utils/CryptoHelper';
 
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
 
    async navigateToLoginPage(url: string) {
        await this.page.goto(url);
    }
 
    async login(testData: any) {
        await this.usernameTextbox.fill(testData.username);
        await this.passwordTextbox.fill(CryptoHelper.decrypt(testData.password));
        await this.loginButton.click();
    }
 
    async verifyInvalidLogin(testData: any) {
        await expect(this.alertMessage).toBeVisible();
        await expect(this.alertMessage).toHaveText(testData.expectedAlert);
    }

    async verifyRequiredFieldErrorShown(testData: any) {
        await expect(this.errorLoginField).toBeVisible();
        await expect(this.errorLoginField).toHaveText(testData.expectedErrorMessage);
        await expect(this.errorPasswordField).toBeVisible();
        await expect(this.errorPasswordField).toHaveText(testData.expectedErrorMessage);
    }
}
