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
     // const userName = page.locator("#username");
      //หรือเรียกใช้เเบบประกาศตัวเเปร
     // await userName.fill("rahulshettyacademy");
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
      console.log("ค่าในช่อง username คือ:", value);
      await page.locator("[type='password']").fill("Learning@830$3mK2");
      //Radio Button / Checkbox: (ปุ่มกลม/ปุ่มเหลี่ยมที่มีให้ติ๊ก) ➡️ ใช้คำสั่ง .check() หรือ .uncheck()
      //Dropdown List: (กล่องที่ต้องกดแล้วมีรายการยืดลงมา) ➡️ ต้องใช้คำสั่ง .selectOption("ค่า value") เท่านั้นครับ สั่ง .check() จะเออร์เรอร์ทันทีแบบที่เจอในรอบแรกครับเเต่ไม่เสมอไปบางตัวเป็น selct ปลอมต้องคิลกก่อนเลยจะใช้ไม่ได้
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
      await expect(page.locator("#terms")).toBeChecked();  //.tobe (ตรวจสอบ) วงเล็บภายใค้ locator ไม่ได้ เเต่ .is (ตรวจสอบ)จะได้
      await page.locator("#terms").uncheck();
      expect(await page.locator("#terms").isChecked()).toBeFalsy();
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
      await expect(modal).not.toBeVisible();

      // 2. ทำงานส่วนของ User เสร็จแล้ว... อยากเปลี่ยนกลับไป Admin
      await page.locator("input[value='admin']").check(); 

      // เช็กให้ชัวร์ว่าเปลี่ยนเป็น Admin แล้ว (หน้า Modal สำหรับ Admin อาจจะไม่เด้ง หรือเด้งข้อความอื่น)
      await expect(page.locator("input[value='admin']")).toBeChecked();
      await expect(page.locator("input[value='user']")).not.toBeChecked();
      await page.locator("[type='password']").fill("1234");
      const documentLink = page.locator("[href*='documents-request']");
      await expect(documentLink).toHaveAttribute("class","blinkingText");

    });

    //test("Child Windows",async({browser}) =>{

   test("Child Windows",async({page, context}) =>{
      // แม้ beforeEach จะเปิดหน้าเว็บไว้ให้แล้ว แต่เคสนี้คุณต้องการใช้ context/browser ใหม่
      // คุณสามารถสั่ง page.goto ใหม่ หรือทำงานต่อได้เลย
    //  const context = await browser.newContext();
    // const page = await context.newPage();

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const documentLink = page.locator("[href*='documents-request']");

      const [newPage] = await Promise.all(
      [ 
         context.waitForEvent('page'), // new page pending  เป็นการดักจับ Tab ใหม่ที่เกิดขึ้นใน Context นั้นๆ
       documentLink.click(),
      ]   )// new page open

      const [newPage2] = await Promise.all([
         context.waitForEvent('page'),
         documentLink.click(),
      ]);
       await newPage2.waitForLoadState('networkidle');
       

      // 1. นำ Focus มาที่หน้าใหม่นี้ให้แน่ชัด
      await newPage.bringToFront();

      // 2. รอหน้าโหลด
      await newPage.waitForLoadState('networkidle'); //รอจนหน้าใหม่โหลดเสร็จก่อนค่อยอ่านข้อความ
      await newPage2.waitForLoadState('networkidle');

      // ตอนนี้คุณมีทั้ง newPage1 และ newPage2 ให้ใช้งานแล้วครับ
      console.log(await newPage.title());
      console.log(await newPage2.title());

      // 3. ก่อนอ่านค่า ให้ลอง Print URL ออกมาดูว่าใช่หน้าที่เราต้องการไหม
      console.log("Current URL: ", newPage.url());

      const text = await newPage.locator(".red").textContent();
      const arrayText = text.split("@");
      const domain = arrayText[1].split(" ")[0] // การใส่ [0] ต่อท้าย จึงเป็นการดึง สมาชิกตัวแรก ออกมา ซึ่งก็คือ "rahulshettyacademy.com" นั่นเองครับ
      
      console.log("ค่าที่ดึงมาได้คือ",domain);
      
      //อยากดู Text ให้ใช้ .textContent() 
      //อยากเช็คว่า Text ถูกต้องไหม ให้ใช้ await expect().toContainText()
      if(domain){
         await page.locator("#username").fill(domain);
         await page.pause();
         console.log(await page.locator("#username").textContent());  // ใช้สำหรับดึง "ข้อความที่อยู่ภายใน" แท็ก (Content)
         console.log(await page.locator("#username").inputValue());  // ใช้สำหรับดึง "ค่าที่ถูกกรอกหรือระบุไว้ใน Attribute" ของช่อง Input

         console.log("ดึงค่าสำเร็จ")
      } else {
         throw new Error("ดึงค่า Email มาป้อนไม่สำเร็จ!");
      }
      
      
      // กรณี เรียกใช้ page ต้องมีการประกาศ
      // // ต้องประกาศตัวแปรเพื่อรอรับหน้าต่างใหม่ที่กำลังจะเปิดขึ้นมา
      // const [newPage] = await Promise.all([
      //    page.context().waitForEvent('page'), // รอเปิดหน้าต่างใหม่
      //    documentLink.click()                 // คลิกเพื่อให้เกิดเหตุการณ์นั้น
      //  ]);
 
      //  // ตอนนี้คุณสามารถสั่งงานในหน้าต่างใหม่ได้ผ่านตัวแปร newPage
      //  await newPage.waitForLoadState();
      //  console.log(await newPage.title());


    });
});