import { test } from '@lib/BaseTest';
import '@hook/BeforeTest';
 
test('Search valid username only', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_01' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyUsernameCellDisplay(testData);
})
 
test('Case-insensitive search', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_02' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyUsernameCellDisplay(testData);
})
 
test('Search valid user role only', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_03' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.selectUserRoleOption(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyUserRoleCellDisplay(testData);
})
 
test('Search valid user status only', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_04' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.selectStatusOption(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyStatusCellDisplay(testData);
})
 
test('Search with multiple filters', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_05' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername(testData);
    await adminPage.selectUserRoleOption(testData);
    await adminPage.selectStatusOption(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyUsernameCellDisplay(testData);
    // await adminPage.verifyUserRoleCellDisplay('Admin');
    await adminPage.verifyStatusCellDisplay(testData);
})
 
test('Search returns no match', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_06' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyAlert(testData);
})
 
test('Username with leading/trailing spaces', {
    tag: ['@admin', '@smoke', '@negative'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_07' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyAlert(testData);
})
 
test('Invalid characters in Username', {
    tag: ['@admin', '@smoke', '@negative'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_08' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyAlert(testData);
})
 
test('Invalid characters in Employee Name', {
    tag: ['@admin', '@smoke', '@negative'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_09' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputEmployeeName(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyErrorMessage(testData);
})
 
test('Large input in Employee Name - 101 characters', {
    tag: ['@admin', '@smoke', '@edge'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_10' },
    ]
}, async ({ dashboardPage, adminPage, testData }) => {
    testData.employeeName = 'a'.repeat(101);
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputEmployeeName(testData);
    await adminPage.clickSearchButton();
    await adminPage.verifyErrorMessage(testData);
})
