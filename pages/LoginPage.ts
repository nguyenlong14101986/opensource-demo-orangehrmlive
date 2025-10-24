import {expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
 
export class LoginPage extends BasePage {
    readonly usernameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly alertMessage: Locator;
 
    constructor(page: any) {
        super(page);
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.alertMessage = page.getByText('Invalid credentials');
    }
 
    async verifyPageDisplay(): Promise<void> {
        await expect(this.loginButton).toBeVisible();
    }
 
    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
 
    async login(username: string, password: string): Promise<void> {
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
        // await this.page.waitForLoadState('networkidle');
    }
 
    async verifyInvalidLogin(): Promise<void> {
        await expect(this.alertMessage).toBeVisible();
        await expect(this.alertMessage).toHaveText('Invalid credentials');
    }
}
