const { test, expect, beforeEach, afterEach } = require('@playwright/test');

test('Browser Context playwright test', async ({ browser }) => {
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
   
   const a = await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("#login").click(); 
   console.log(a);
   
   await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");   


   await page.getByPlaceholder('search').fill('iPhone 17 Pro Max');

   // ให้หลุดโฟกัสจากช่อง
   await page.getByPlaceholder('search').blur();
   // สั่งให้ไปคลิกตรงพื้นที่ว่างๆ (Body ของหน้าเว็บ) เพื่อถอนเมาส์ออกมา
   await page.locator('body').click();
   const title = await page.locator(".card-body b").allTextContents();
   console.log(title);
});

