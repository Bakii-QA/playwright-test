/*const { test, expect, beforeEach, afterEach } = require('@playwright/test');

test('Browser Context playwright test', async ({ page }) => {

   await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
   
   const a = await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("#login").click(); 
   console.log(a);
   
   await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");   

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
      .filter({hasText: "ADIDAS ORIGINAL"})
      .getByRole('button',{name: ' View'}).click();

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


*/