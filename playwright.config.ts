import { defineConfig, devices } from '@playwright/test';
import { config } from './config/envLoader';

//create run unique generate id 
process.env.RUN_ID = `run_${Date.now()}`;

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
    // Set real user agent at context level to prevent Cloudflare detection
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

    // Capture screenshot only on test failure
    screenshot: 'only-on-failure',

    // Record video only on test failure
    video: 'retain-on-failure',

    // Record trace only on test failure for rich visual debugging
    trace: 'retain-on-failure',

    // Bypass HTTPS errors and self-signed certificate issues
    ignoreHTTPSErrors: true,

    // Custom HTTP headers to impersonate a real browser.
    // This is required to bypass bot-detection / Cloudflare protection (403 Forbidden) on automationexercise.com API endpoints.
    extraHTTPHeaders: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  },

  /**
   * Setup multiple reporting outputs:
   * 1. Standard HTML report for local inspection
   * 2. Allure report for dashboard visualization & CI integrations
   */
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['json',{outputFile :'reports/report.json' }]
  ],

  /**
   * Target projects for execution across platforms and device emulations
   */
  projects: [
    {
      name : 'setup',
      testMatch: /.*\.setup\.ts/, 
    },
    {
      name : 'web',
      testIgnore: /.*\.setup\.ts/,
      use : {
        browserName : 'chromium',
      },
      dependencies : ['setup'],
    }
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
