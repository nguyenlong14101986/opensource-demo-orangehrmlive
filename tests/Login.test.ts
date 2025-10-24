import { test } from '@lib/BaseTest';
 
test.describe('Login Test', {
    tag: ['@login', '@smoke']
}, () => {
    test('Valid Login', {
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_01' },
        ]
    }, async ({ loginPage, dashboardPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('admin', 'admin123');
        await dashboardPage.verifyPageDisplay();
    });
 
    test('Invalid Login', {
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_02' },
        ]
    }, async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('admin', 'admin12');
        await loginPage.verifyInvalidLogin();
    })
})
