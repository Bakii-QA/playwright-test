const { test, expect, beforeEach, afterEach } = require('@playwright/test');

test('Browser Context playwright test', async ({ browser }) => {
   // สร้างบริบทใหม่ขึ้นมา
   const context = await browser.newContext();
   // สร้างหน้าใหม่ขึ้นมา
   const page = await context.newPage();
   // เรียกใช้หน้าใหม่
   await page.goto("https://www.google.co.th/index.html")
});

// รันเฉพาะ 
//test.only('Page playwright test',async ({page})=>

// 1. ใช้ test.describe เพื่อรวมกลุ่มเทสที่เกี่ยวข้องกัน (เช่น เรื่อง Login)
test.describe('Login Functionality Tests', () => {


   // 2. ใช้ beforeEach เพื่อเปิดหน้าเว็บรอไว้เลย ทุกเคสจะได้ไม่ต้องเขียนบรรทัดนี้ซ้ำ
   beforeEach(async ({ page }) => {
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const userName = page.locator("#username")
      //หรือเรียกใช้เเบบประกาศตัวเเปร
      await userName.fill("rahulshettyacademy");
   });

   // เคสที่ 1: Happy Path (กรอกถูกหมด)
   test('TC-01: กรอกข้อมูลถูกต้อง -> ต้องล็อกอินสำเร็จเข้าสู่ระบบได้', async ({ page }) => {
      //await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
      console.log(await page.title());
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
const cardTitle = page.locator(".card-title")
      

      await page.locator("#username").fill("rahulshettyacademy");
      // เช็คว่าผลลัพธ์ที่ออกเป็นตามที่พิมไหม
      const value = await page.locator("#username").inputValue();
      await expect(value).toBe("rahulshettyacademy");

      await page.locator("[type='password']").fill("Learning@830$3mK2");
      //Radio Button / Checkbox: (ปุ่มกลม/ปุ่มเหลี่ยมที่มีให้ติ๊ก) ➡️ ใช้คำสั่ง .check() หรือ .uncheck()
      //Dropdown List: (กล่องที่ต้องกดแล้วมีรายการยืดลงมา) ➡️ ต้องใช้คำสั่ง .selectOption("ค่า value") เท่านั้นครับ สั่ง .check() จะเออร์เรอร์ทันทีแบบที่เจอในรอบแรกครับ
      await page.locator("input[value='admin']").check();
      await page.locator("select.form-control").selectOption("stud");
      await page.locator("#terms").check();
      await page.locator("#signInBtn").click();
      await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");   

      console.log(await page.locator(".card-body a").first().textContent());
      console.log(await cardTitle.nth(1).textContent());

      const allCardtitle = await cardTitle.allTextContents();
      []
      console.log(allCardtitle);
   
   
   });

   // เคสที่ 2: Negative Path (กรอกผิด)
   test('TC-02: กรอกรหัสผ่านผิด -> ต้องล็อกอินไม่ผ่าน และมีข้อความเตือนสีแดง',async({page})=>{
      await page.locator("#username").fill("rahulshettyacademy");
      await page.locator("[type='password']").fill("1234");
      await page.locator("input[value='admin']").check();
      await page.locator("select.form-control").selectOption("consult");
      await page.pause();
      await page.locator("#terms").check();
      await page.locator("#signInBtn").click();
      //หรืออีกเเบบ
      //await page.locator("[style*'block';]").toContainText("Incorrect username/password.");

      // ตรวจสอบข้อความเตือน (Error Message) ที่เด้งขึ้นมาบนจอ
      const errorAlert = page.locator(".alert-danger"); // คลาสกล่องสีแดงของเว็บนี้
      await expect(errorAlert).toBeVisible();
      await expect(errorAlert).toContainText("Incorrect username/password.");
      await page.locator("#signInBtn").click();

   });

   // เคสที่ 3: ไม่กรอกอะไรเลย
   test('TC-03: ไม่กรอกอะไรเลย -> ต้องล็อกอินไม่ผ่าน และมีข้อความเตือนสีแดง',async({page})=>{
      // ไม่สั่ง fill() ใดๆ ทั้งสิ้น กดปุ่มเลย
      await page.locator("#signInBtn").click();
       // ตรวจสอบข้อความเตือน (Error Message) ที่เด้งขึ้นมาบนจอ
         const errorAlert = page.locator(".alert-danger"); // คลาสกล่องสีแดงของเว็บนี้
      await expect(errorAlert).toBeVisible();
      await expect(errorAlert).toContainText("Empty username/password.");
});
    test("TC-04: เลือก Radio เป็น User",async({page}) =>{
      await page.locator("input[value='user']").check();
      const modal = page.locator('.modal-body');
      await expect(modal).toBeVisible({ timeout: 10000 });
      await expect(modal).toContainText("You will be limited to only fewer functionalities of the app. Proceed?");
      console.log("เเสดงผลลัพธ์",{modal});
      await page.locator("#okayBtn").click();
      await page.locator("[type='password']").fill("1234");

    });
});