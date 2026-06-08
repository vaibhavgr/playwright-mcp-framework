import { defineConfig, devices } from '@playwright/test';
import { config } from './config/envLoader';

/**
 * Playwright Test Configuration
 * See https://playwright.dev/docs/test-configuration for reference.
 */
export default defineConfig({
  // Directory containing the E2E test suite
  testDir: './tests',
  timeout: 60000,
  expect: {
    // Maximum time expect() should wait for the condition to be met (8 seconds)
    timeout: 8000,
  },

  // Fail the build on CI if test.only is left in the code
  forbidOnly: !!process.env.CI,

  // Retry configuration loaded from the environment parameters
  retries: config.retry,

  // Number of parallel workers loaded from the environment parameters
  workers: config.workers,

  /**
   * Shared options for all projects.
   * Individual project overrides can be specified below.
   */
  use: {
    // Base URL of the target application
    baseURL: config.baseURL,

    // Execution mode: Headless or Headed
    headless: config.headless,

    // Target browser engine
    browserName: config.browser as any,

    // Capture screenshot only on test failure
    screenshot: 'only-on-failure',

    // Record video only on test failure
    video: 'retain-on-failure',

    // Record trace only on test failure for rich visual debugging
    trace: 'retain-on-failure',

    // Bypass HTTPS errors and self-signed certificate issues
    ignoreHTTPSErrors: true,
  },

  /**
   * Setup multiple reporting outputs:
   * 1. Standard HTML report for local inspection
   * 2. Allure report for dashboard visualization & CI integrations
   */
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }]
  ],

  /**
   * Target projects for execution across platforms and device emulations
   */
  projects: [
    {
      name: 'Web',
      use: {
        browserName: 'chromium',
        headless: false,
      },
    },
    // {
    //   name: 'Mobile_IOS',
    //   use: {
    //     browserName: 'chromium',
    //     headless: false,
    //     ...devices['iPhone 15 Pro Max'],
    //   },
    // },
    // {
    //   name: 'Mobile_Android',
    //   use: {
    //     browserName: 'chromium',
    //     headless: false,
    //     ...devices['Pixel 7'],
    //   },
    // },
  ],
});
