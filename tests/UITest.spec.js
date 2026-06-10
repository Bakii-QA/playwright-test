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

// รันเฉพาะ 
//test.only('Page playwright test',async ({page})=>

test('Page playwright test',async ({page})=>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   console.log(await page.title());
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   await page.locator("#username").fill("rahulshettyacademy");
   await page.locator("[type='password']").fill("Learning@830$3mK2");
   await page.locator("input[value='admin']").check();
   await page.locator("select.form-control").selectOption("stud");
   await page.locator("#term").check(true);
   await page.locator("#signInBtn").click();
}

);