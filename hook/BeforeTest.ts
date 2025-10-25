import { test } from '@lib/BaseTest';
import { DataLoader } from '@utils/DataLoader';

test.beforeEach(async ({ loginPage, dashboardPage }, testInfo) => {
    const hasLoginTag = testInfo.tags.some(tag => tag === '@login');
    const testData = DataLoader.readFile('login-data.json', 'TC_LOGIN_01');
    if (hasLoginTag) {
        return;
    } else {
        await loginPage.navigateToLoginPage();
        await loginPage.login(testData);
        await dashboardPage.verifyPageDisplay();
    }
});