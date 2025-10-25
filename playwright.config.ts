import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup',
  testDir: './tests',
  timeout: 20 * 1000,
  expect: {
    timeout: 20 * 1000,
  },
  fullyParallel: true,
  retries: 1,

  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        ignoreHTTPSErrors: true,
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        ignoreHTTPSErrors: true,
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },

    {
      name: 'webkit',
      use: {
        browserName: 'firefox',
        headless: true,
        ignoreHTTPSErrors: true,
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },
  ],
});
