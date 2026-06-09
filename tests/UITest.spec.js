const {test , expect} = require('@playwright/test');

test('Browser Context playwright test',async ({browser})=>
{
// สร้างบริบทใหม่ขึ้นมา
   const context = await browser.newContext();
// สร้างหน้าใหม่ขึ้นมา
   const page = await context.newPage();
// เรียกใช้หน้าใหม่
   await page.goto("https://www.google.co.th/index.html")
});

test.only('Page playwright test',async ({page})=>
{
   await page.goto("https://www.google.co.th/index.html")
   console.log(await page.title());
   await expect(page).toHaveTitle("Google")
}

);