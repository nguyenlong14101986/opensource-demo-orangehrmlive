import { test } from '@lib/BaseTest';
import { DataLoader } from '@utils/DataLoader';

test.beforeEach(async ({ loginPage, dashboardPage, env }, testInfo) => {
    const hasLoginTag = testInfo.tags.some(tag => tag === '@login');
    const testData = {
        username: env.username,
        password: env.password
    };
    if (hasLoginTag) {
        return;
    } else {
        await loginPage.navigateToLoginPage(env.baseUrl);
        await loginPage.login(testData);
        await dashboardPage.verifyPageDisplay();
    }
});