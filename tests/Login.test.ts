import { test } from '@lib/BaseTest';
 
test.describe('Login Test', {
    tag: ['@login', '@smoke']
}, () => {
    test('Login with valid admin credentials', {
        tag: '@funtional',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_01' },
        ]
    }, async ({ loginPage, dashboardPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.verifyPageDisplay();
    });
 
    test('Login with mixed-case username', {
        tag: '@funtional',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_02' },
        ]
    }, async ({ loginPage, dashboardPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('aDmIn', 'admin123');
        await dashboardPage.verifyPageDisplay();
    })

    test('Login with incorrect password', {
        tag: '@negative',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_03' },
        ]
    }, async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('admin', 'wrongpass');
        await loginPage.verifyInvalidLogin();
    })

    test.only('Login with empty fields', {
        tag: '@negative',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_04' },
        ]
    }, async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('', '');
        await loginPage.verifyRequiredFieldErrorShown();
    })

    test('Login with max length credentials', {
        tag: '@negative',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_05' },
        ]
    }, async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('a'.repeat(257), 'admin123');
        await loginPage.verifyInvalidLogin();
    })
})
