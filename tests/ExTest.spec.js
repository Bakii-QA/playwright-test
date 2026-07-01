const {expect , test ,beforeEach} = require('@playwright/test')

test.describe('ทดสอบการไหล Flow',()=>{
    beforeEach('Start',async ({page})=> {
        await page.goto("https://practicesoftwaretesting.com/");
    })

    test('TC01-open Testing Guide For Test',async({page})=>{
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
        const currentTitle = await page.title();
        console.log("ตรวจสอบชื่อคือ:", currentTitle);
        await page.getByRole('button',{name: 'Testing Guide' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('button',{name: '✕ Close Split Screen' }).click();
})
    test('TC02-Change Language',async ({page})=>{
        await page.locator('#language').click();
        await page.locator('[role="menuitem"]',{hasText:'DE'}).click();

        await page.keyboard.press('Escape'); // บังคับให้หน้าเว็บ Reset สถานะเมนู

        await page.locator('#language').click();
        //await page.locator('.dropdown-item [role="menuitem"]',{hasText:'EN'}).click();
        await page.getByRole('menuitem',{name: 'EN' }).click();

    })
    test('TC03-SignIn Account',async({page})=>{
        await page.locator('[data-test="nav-sign-in"]').click();
        await page.locator('input[type="email"]').fill('banktest@gmail.com');
        const passwordField = page.locator('input[type="password"]')
        await passwordField.fill('123');
        await page.locator('button', { has: page.locator('[data-icon="eye"]') })
        const currentValue = await passwordField.inputValue();
        await page.locator('input[type="password"]').fill(currentValue+'456');
        await page.locator('button', { has: page.locator('[data-icon="eye-slash"]') })
        console.log("ค่าของ Password คือ",currentValue);
        //page.keyboard.type('123'); เป็นคำสั่งพิมต่อจากข้อความเดิมเช่น
        // await page.keyboard.type('123'); // พิมพ์ 123
        // await page.locator('input[type="button"]').click(); // กดปุ่ม
        // await page.keyboard.type('456'); // พิมพ์ 456 ต่อเข้าไป (ผลลัพธ์จะเป็น 123456)
        await page.locator('[type="submit"]').click();
        const a = page.locator(".help-block");
        await expect(a).toBeVisible();
        await expect(a).toContaintext("Invalid email or password");

        // ใช้ toHaveText ถ้าต้องการเช็คว่าข้อความตรงกันแบบเป๊ะๆ
       // await expect(a).toHaveText("Invalid email or password");
        
        // หรือใช้ toContainText ถ้าต้องการเช็คแค่ว่ามีข้อความนี้ปรากฏอยู่ (แนะนำตัวนี้มากกว่า เพราะยืดหยุ่นกว่า)
       // await expect(a).toContainText("Invalid email or password");

    })









})