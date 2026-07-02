// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  timeout: 40 * 1000,
  expect:{
    timeout: 40 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [
    ['html']
   // ['allure-playwright']
  ],
  /* หากไม่อยากให้เเสดง reporter: [['html',{open:'never'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    browserName: 'Chromium',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on',
    headless: false,
    /* สั่งให้บันทึกวิดีโอทุกรอบ ไม่ว่าจะผ่านหรือพัง */
    video: 'on', 
    /* ทริคเพิ่มเติม: ถ้าอยากได้รูป Screenshot ตอนเทสผ่านด้วย ให้เปิดตัวนี้ */
    screenshot: 'on',
    trace: 'on-first-retry',
    contextOptions: {
      recordVideo: { dir: 'test-results/' }
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  
 // อัดทั้งหมด แต่ถ้าเคสไหนผ่านมันจะลบทิ้งอัตโนมัติ เหลือไว้เฉพาะเคสที่พัง (ค่านี้มักจะเป็นต้วเริ่มต้น)
  // use: {
  //   screenshot: 'only-on-failure',
  //   video: 'retain-on-failure',
  // }

  // ซ้ำปิดออก
  // use: {
  //   /* สั่งให้บันทึกวิดีโอทุกรอบ ไม่ว่าจะผ่านหรือพัง */
  //   video: 'on', 
  //   /* ทริคเพิ่มเติม: ถ้าอยากได้รูป Screenshot ตอนเทสผ่านด้วย ให้เปิดตัวนี้ */
  //   screenshot: 'on',
  //   trace: 'on-first-retry',
  //   contextOptions: {
  //     recordVideo: { dir: 'test-results/' }
  //   },
  // }
//


});
module.exports = config


