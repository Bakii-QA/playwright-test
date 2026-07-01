// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../models/LoginPage');

test('TC01 - Should fill and toggle password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/login');

  await loginPage.fillPassword('123');
  await loginPage.togglePassword();
  
  const value = await loginPage.getPasswordValue();
  console.log("ค่า Password คือ:", value);
  
  // การ Assert ก็จะดูสะอาดตามาก
  await expect(value).toBe('123');
});