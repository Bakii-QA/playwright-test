const { test, expect, beforeEach, afterEach } = require('@playwright/test');

// 🌟 ย้ายการ Login มาไว้ที่นี่: ระบบจะทำสเตปนี้ "ก่อน" เริ่มเทสทุกข้อเสมอ
test.beforeEach(async ({ page }) => {
   // 1. เปิดเว็บและ Login
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("#login").click(); 
   
   // 2. รอให้เข้าหน้า Dashboard สำเร็จชัวร์ๆ
   await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");   

   // 3. การันตีว่ามีหน้าต่างสินค้าโผล่มาบนจอแล้วแน่ๆ (ใช้แทน networkidle ไปเลย ปลอดภัยกว่า)
   await page.locator(".card-body b").first().waitFor({ state: 'visible' });
});

// 🧪 เทสที่ 1: ระบบจะแอบรัน beforeEach ให้ก่อน แล้วค่อยรันโค้ดด้านล่างนี้
test('Browser Context playwright test', async ({ page }) => {

   await page.getByRole('textbox', { name: 'search' }).fill('iPhone 17 Pro Max');
   // ให้หลุดโฟกัสจากช่อง
   await page.getByRole('textbox', { name: 'search' }).blur();
   // สั่งให้ไปคลิกตรงพื้นที่ว่างๆ (Body ของหน้าเว็บ) เพื่อถอนเมาส์ออกมา
   await page.locator('body').click();

   // ไว้สำหรับสั่งให้ Playwright "หยุดรอจนกว่าหน้าเว็บจะโหลดข้อมูลหลังบ้านเสร็จนิ่งสนิทจริงๆ" ถึงจะยอมปล่อยให้โค้ดบรรทัดถัดไปทำงานครับ
   // แต่ไม่ค่อยเเนะนำเนื่องจากเสี่ยงช้า load
   // await page.waitForLoadState('networkidle');

   // จับกล่องใหญ่ที่คลุมสินค้าทั้งหมด
   const productContainer = page.locator('#products .container');
// 💡 เอาไปใช้รอเพื่อให้แน่ใจว่าสินค้าโหลดขึ้นมาแล้ว (ใช้แทน networkidle ได้เลย)
   await expect(productContainer).toBeVisible();

   const title = await page.locator(".card-body b").allTextContents();
   console.log(title);
});

   test("เทสการดู View ของเเต่ละ container",async ({page})=>
   {
      await page.locator('#products .container')
               .filter({ hasText: /ADIDAS ORIGINAL/i }) 
               .getByRole('button', { name: /view/i }) // ใช้ Regex กับปุ่มด้วย ป้องกันเรื่องช่องว่างหรือตัวเล็กใหญ่
               .click();

      //หรือ
      // 1. หาพื้นที่กล่องสินค้าทั้งหมดมาก่อน แล้วเก็บไว้ในตัวแปร
   //const allProducts = page.locator('#products .container');
   // 2. เอาตัวแปรจากข้อ 1 มากรองเฉพาะกล่องที่มีคำว่า ADIDAS (ส่งไม้ต่อ)
   //const adidasCard = allProducts.filter({ hasText: 'ADIDAS ORIGINAL' });
   // 3. เอาตัวแปรจากข้อ 2 มาหาปุ่ม View แล้วกดคลิก (ส่งไม้ต่อครั้งสุดท้าย)
   //await adidasCard.getByRole('button', { name: 'View' }).click();
   });

   test("เทสการเลือก",async ({page})=> {
   await page.locator('#products .container')
          .filter({ hasText: /ZARA COAT 3/i })
          .getByRole('button', { name: /Add To Cart/i })
          .click();
   });


   /*ทดสอบ loop
   const loginData = [
      {
        username: 'admin',
        password: '1234',
        expected: 'PASS'
      },
      {
        username: 'admin',
        password: 'wrong',
        expected: 'FAIL'
      },
      {
        username: 'test',
        password: '1234',
        expected: 'FAIL'
      }
     ];
     for (const data of loginData) {
      test(`Login Test - ${data.username}`, async ({ page }) => {
        await page.goto('https://example.com/login');
        await page.locator('#username').fill(data.username);
        await page.locator('#password').fill(data.password);
        await page.locator('#loginBtn').click();
        const successMessage = page.locator('.dashboard');
        if (data.expected === 'PASS') {
          await expect(successMessage).toBeVisible();
        } else {
          await expect(page.locator('.error-message')).toBeVisible();
        }
      });
     }   
   */





