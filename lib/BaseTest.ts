import { test as baseTest, TestInfo } from '@playwright/test';
import { EnvManager } from '@utils/EnvManager';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { AdminPage } from '@pages/AdminPage';
import { WebUI } from '@lib/WebUI';
import { DataLoader } from '@utils/DataLoader';

export const test = baseTest.extend<{
    webUI: WebUI;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminPage: AdminPage;
    testData: any;
    env: typeof EnvManager;
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
    testData: async ({ }, use: (data: any) => Promise<void>, testInfo: TestInfo) => {
        const data = await DataLoader.loadFromTestInfo(testInfo);
        await use(data);
    },
    env: async ({}, use) => {
        EnvManager.loadEnv();
        await use(EnvManager);
    },
});
