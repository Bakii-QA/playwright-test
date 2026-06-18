const { test, expect, beforeEach, afterEach } = require('@playwright/test');

test('Browser Context playwright test', async ({ browser }) => {
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
   
   const a = await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("#login").click(); 
   console.log(a);
});

