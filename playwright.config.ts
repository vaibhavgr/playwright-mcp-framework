// @ts-check
import { devices, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import { config } from './config/envLoader';

export default defineConfig({
  testDir: './tests',

  retries: config.retry,
  workers: config.workers,

  use: {
    baseURL: config.baseURL,
    headless: config.headless,
    browserName: config.browser as any,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }]
  ],

  projects: [
    {
      name: 'Web',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',  //on off
      
      },
    },

  //   {
  //     name: 'Mobile_IOS',
  //     use: {
  //       browserName: 'chromium',
  //       headless: false,
  //       screenshot: 'on',
  //       trace: 'on',  //on off
  //      ...devices['iPhone 15 Pro Max']
  //     },
  //   },

  //   {
  //     name: 'Mobile_Android',
  //     use: {
  //       browserName: 'chromium',
  //       headless: false,
  //       screenshot: 'on',
  //       trace: 'on',  //on off
  //      ...devices['Pixel 7']
  //     },
  //   },
  ]
});
