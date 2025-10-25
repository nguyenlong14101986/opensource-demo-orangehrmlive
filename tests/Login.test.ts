import { test } from '@lib/BaseTest';
import '@hook/BeforeTest';
 
test.describe('Login Test', {
    tag: ['@login', '@smoke']
}, () => {
    test('Login with valid admin credentials', {
        tag: '@funtional',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_01' },
        ]
    }, async ({ loginPage, dashboardPage, testData, env }) => {
        await loginPage.navigateToLoginPage(env.baseUrl);
        await loginPage.login(testData);
        await dashboardPage.verifyPageDisplay();
    });
 
    test('Login with mixed-case username', {
        tag: '@funtional',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_02' },
        ]
    }, async ({ loginPage, dashboardPage, testData, env }) => {
        await loginPage.navigateToLoginPage(env.baseUrl);
        await loginPage.login(testData);
        await dashboardPage.verifyPageDisplay();
    })

    test('Login with incorrect password', {
        tag: '@negative',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_03' },
        ]
    }, async ({ loginPage, testData, env }) => {
        await loginPage.navigateToLoginPage(env.baseUrl);
        await loginPage.login(testData);
        await loginPage.verifyInvalidLogin(testData);
    })

    test('Login with empty fields', {
        tag: '@negative',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_04' },
        ]
    }, async ({ loginPage, testData, env }) => {
        await loginPage.navigateToLoginPage(env.baseUrl);
        await loginPage.login(testData);
        await loginPage.verifyRequiredFieldErrorShown(testData);
    })

    test('Login with max length credentials', {
        tag: '@negative',
        annotation: [
            { type: 'testcaseId', description: 'TC_LOGIN_05' },
        ]
    }, async ({ loginPage, testData, env }) => {
        testData.username = 'a'.repeat(257)
        await loginPage.navigateToLoginPage(env.baseUrl);
        await loginPage.login(testData);
        await loginPage.verifyInvalidLogin(testData);
    })
})
