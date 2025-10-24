import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage'
import { DashboardPage } from '@pages/DashboardPage';
import { AdminPage } from '@pages/AdminPage';
import { WebUI } from '@lib/WebUI';
 
export const test = baseTest.extend<{
    webUI: WebUI;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminPage: AdminPage;
}>({
    webUI: async ({ page }, use) => {
        await use(new WebUI(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page));
    },
})
 
test.beforeEach(async ({ loginPage, dashboardPage }, testInfo) => {
    const hasLoginTag = testInfo.tags.some(tag => tag === '@login');
    if (hasLoginTag) {
        return;
    } else {
        // Perform login only if @Login tag is NOT present
        await loginPage.navigateToLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.verifyPageDisplay();
    }
});
