const {expect , test ,beforeEach} = require('@playwright/test')
//(Flaky Test คือเทสต์ที่ เดี๋ยวผ่าน เดี๋ยวพัง โดยที่ไม่ได้แก้โค้ดเลย)
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
        const usernameValue = page.locator('input[type="email"]');
        await usernameValue.fill('banktest@gmail.com');

        const passwordField = page.locator('input[data-test="password"]');
        await passwordField.fill('123');
        await page.locator('button', { has: page.locator('[data-icon="eye"]') }).click();


        const currentValue = await passwordField.inputValue();
        await passwordField.fill(currentValue+'45678910');


        const finalValue = await passwordField.inputValue();
        // 3. แสดงผลค่าที่ได้
        console.log("ค่าของ Password คือ", finalValue);

        if (!usernameValue || !finalValue) {
            console.log("Username หรือ Password ว่างอยู่");
        } else {
            console.log("Username และ Password มีค่าครบถ้วน");
        }
        
        //page.keyboard.type('123'); เป็นคำสั่งพิมต่อจากข้อความเดิมเช่น
        // await page.keyboard.type('123'); // พิมพ์ 123
        // await page.locator('input[type="button"]').click(); // กดปุ่ม
        // await page.keyboard.type('456'); // พิมพ์ 456 ต่อเข้าไป (ผลลัพธ์จะเป็น 123456)

        await page.locator('button', { has: page.locator('[data-icon="eye-slash"]') }).click();

        //วิธีคลิกปุ่มเมื่อจอเล็ก :1 
        // await page.mouse.wheel(0, 500);
        // await page.locator('input[data-test="login-submit"]').click();

        //วิธีคลิกปุ่มเมื่อจอเล็ก :2
        let clickCount = 0;
        const submitBtn = page.locator('input[data-test="login-submit"]');
        await submitBtn.scrollIntoViewIfNeeded(); 
        await submitBtn.click();
        clickCount++; // บวกค่าเพิ่ม 1
        console.log("มีการคลิกเเล้ว",clickCount +"ครั้ง");

        const count = await page.locator('input[data-test="login-submit"]').count();
        console.log("จำนวนปุ่มที่เจอคือ:", count);

        const a = page.locator('[data-test="login-error"]');
        await expect(a).toBeVisible();
        await expect(a).toContainText("Invalid email or password");

        // ใช้ toHaveText ถ้าต้องการเช็คว่าข้อความตรงกันแบบเป๊ะๆ
       // await expect(a).toHaveText("Invalid email or password");
        
        // หรือใช้ toContainText ถ้าต้องการเช็คแค่ว่ามีข้อความนี้ปรากฏอยู่ (แนะนำตัวนี้มากกว่า เพราะยืดหยุ่นกว่า)
       // await expect(a).toContainText("Invalid email or password");

    })

    test('TC-04 Register your account',async({page})=>{

        await page.locator('[data-test="nav-sign-in"]').click();
        const register = await page.locator('a[data-test="register-link"]');
        await register.scrollIntoViewIfNeeded(); 
        await register.click();
        await page.locator('input[data-test="first-name"]').fill("Baaki-QA");
        await page.locator('input[data-test="last-name"]').fill("Engineer");

        const dobField = page.locator('[data-test="dob"]');
        await dobField.fill("1999-11-12");
        await dobField.press('Tab');

        const scroll = page.locator('select[data-test="country"]');
        await scroll.scrollIntoViewIfNeeded(); 
        await scroll.selectOption("Thailand");

        const sc = page.locator('input[data-test="phone"]');
        await sc.scrollIntoViewIfNeeded();

        await page.locator('input[data-test="postal_code"]').fill("10270");
        await page.locator('input[data-test="house_number"]').fill("85/54");
        await expect(page.locator('input[data-test="street"]')).toHaveValue('Abel Fords', { timeout: 5000 });
        await expect(page.locator('input[data-test="city"]')).toHaveValue('West Melany', { timeout: 5000 });
        await expect(page.locator('input[data-test="state"]')).toHaveValue('Pennsylvania', { timeout: 5000 });
        await page.pause();

        const email = "bakii" + Date.now() + "@gmail.com";
        const password = "@Cloud#Alpha10";
        await page.locator('input[data-test="phone"]').fill("0893443321");
        await page.locator('input[data-test="email"]').fill(email);
        console.log("ค่าของ email คือ",email);
        await page.locator('input[data-test="password"]').fill("12345");
        await page.locator('button', { has: page.locator('[data-icon="eye"]') }).click();
        await page.locator('button[data-test="register-submit"]').click();

        await page.locator('input[data-test="password"]').fill(password);
        await page.locator('button[data-test="register-submit"]').click();
        await page.waitForURL("/login");
        await page.locator('input[data-test="email"]').fill(email);
        await page.locator('input[data-test="password"]').fill(password);

        
        
        

        // กรณีทำเช็คเรื่อง ค่าที่ไม่ถูก
        // ลองกรอกค่ามั่วๆ เข้าไป
        // await dobField.fill('invalid-date');
        // await dobField.press('Tab');

        // // ตรวจสอบว่าระบบขึ้น Error จริงไหม (เช็คจาก class 'is-invalid')
        // await expect(dobField).toHaveClass(/is-invalid/);

        // // ตรวจสอบข้อความแจ้งเตือน (ถ้ามี element ที่แสดงข้อความ error)
        // const errorMessage = page.locator('#dob-error'); // อ้างอิงจาก aria-describedby
        // await expect(errorMessage).toBeVisible();





    })







})