import { test as baseTest, TestInfo } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage'
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
})

// test.beforeEach(async ({ loginPage, dashboardPage }, testInfo) => {
//     const hasLoginTag = testInfo.tags.some(tag => tag === '@login');
//     const testData = await DataLoader.loadFromTestInfo(testInfo);
//     if (hasLoginTag) {
//         return;
//     } else {
//         await loginPage.navigateToLoginPage();
//         await loginPage.login(testData);
//         await dashboardPage.verifyPageDisplay();
//     }
// });
