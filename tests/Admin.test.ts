import { test } from '@lib/BaseTest';
 
test('Search valid username only', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_01' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername('Admin');
    await adminPage.clickSearchButton();
    await adminPage.verifyUsernameCellDisplay('Admin');
})
 
test('Case-insensitive search', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_02' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername('admin');
    await adminPage.clickSearchButton();
    await adminPage.verifyUsernameCellDisplay('Admin');
})
 
test('Search valid user role only ', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_03' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.selectUserRoleOption('Admin');
    await adminPage.clickSearchButton();
    await adminPage.verifyUserRoleCellDisplay('Admin');
})
 
test('Search valid user status only', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_04' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.selectStatusOption('Enabled');
    await adminPage.clickSearchButton();
    await adminPage.verifyStatusCellDisplay('Enabled');
})
 
test('Search with multiple filters', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_05' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername('Admin');
    await adminPage.selectUserRoleOption('Admin');
    await adminPage.selectStatusOption('Enabled');
    await adminPage.clickSearchButton();
    await adminPage.verifyUsernameCellDisplay('Admin');
    // await adminPage.verifyUserRoleCellDisplay('Admin');
    await adminPage.verifyStatusCellDisplay('Enabled');
})
 
test('Search returns no match', {
    tag: ['@admin', '@smoke', '@functional'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_06' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername('NonExistingUser');
    await adminPage.clickSearchButton();
    await adminPage.verifyAlert('No Records Found');
})
 
test('Username with leading/trailing spaces', {
    tag: ['@admin', '@smoke', '@negative'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_07' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername('  Admin  ');
    await adminPage.clickSearchButton();
    await adminPage.verifyAlert('No Records Found');
})
 
test('Invalid characters in Username', {
    tag: ['@admin', '@smoke', '@negative'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_08' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputUsername('@@@###');
    await adminPage.clickSearchButton();
    await adminPage.verifyAlert('No Records Found');
})
 
test('Invalid characters in Employee Name', {
    tag: ['@admin', '@smoke', '@negative'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_09' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputEmployeeName('12345@@@');
    await adminPage.clickSearchButton();
    await adminPage.verifyErrorMessage('Invalid');
})
 
test('Large input in Employee Name - 101 characters', {
    tag: ['@admin', '@smoke', '@edge'],
    annotation: [
        { type: 'testcaseId', description: 'TC_SEARCH_10' },
    ]
}, async ({ dashboardPage, adminPage }) => {
    await dashboardPage.navigateToAdminPage();
    await adminPage.verifyPageDisplay();
    await adminPage.inputEmployeeName('a'.repeat(101));
    await adminPage.clickSearchButton();
    await adminPage.verifyErrorMessage('Should not exceed 100 characters');
})
