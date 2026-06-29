const {test , expect , beforeEach} = require('@playwright/test');

test.describe('ทดสอบ Function ไหล Flow',async()=>{
    beforeEach(async({page})=>{
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await expect(page).toHaveTitle("Let's Shop");
        const title = await page.title();
        console.log("หัวข้อคือ",title);
    });

   // toHaveText: ต้องตรงกันทุกตัวอักษร (Exact match)
    //toContainText: ตรวจสอบว่ามีข้อความนั้นอยู่บางส่วนก็ผ่าน (แนะนำให้ใช้ตัวนี้ถ้าข้อความอาจมีช่องว่างหรือจุดที่ซ่อนอยู่)
    //toBe ไม่ใช่เมธอดของ locator 
    test('TC01:กดล็อกอินหน้าจอเเบบไม่มีรหัสผ่าน',async({page})=>{
        await page.locator(".login").click();
//แบบ 1
        //await expect(page.locator(".invalid-feedback:has-text('*Email is required')")).toBeVisible();
        //await expect(page.locator(".invalid-feedback:has-text('*Password is required')")).toBeVisible();

// เเบบ 2
//const errorMessages = page.locator(".invalid-feedback");
        //await expect(errorMessages).toHaveText([
           //  "*Email is required", 
           //  "*Password is required"
            //]);

// แบบ 3
        await expect(page.locator("form-group").filter({ has: page.locator("#userEmail") })
            .locator(".invalid-feedback")).toHaveText("*Email is required");
        await expect(page.locator("form-group").filter({ has: page.locator("#userPassword") })
             .locator(".invalid-feedback")).toHaveText("*Password is required");
});










});

 





    
    








    
    
    
    
    
    
    
    
    
    
    
    