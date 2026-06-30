// git pull origin main ดึง code ล่าสุดจาก git

const {test , expect} = require('@playwright/test');

test.describe("เทสการเปิดเบอร์ 888",async()=>{


    test("เปิด E2E",async({page})=>{
        await page.goto("https://sit-mychannel.cdc.ais.th/ais-fibre/login/callback-signin");
        await page.getByText(" ตกลง ").click();    
        await page.locator('#mat-select-value-0').click();

        await page.locator('#mat-option-2').getByText('Temporary login').click();        
        await page.getByRole('button', { name: 'Next' }).click();
        await page.locator("#usernameUserInput").fill("somjateh");
        await page.getByTestId('login-page-password-input').fill('MyChannel#May26');
        await page.getByTestId('login-page-continue-login-button').click();
        await page.waitForLoadState('networkidle');
        await page.goto("https://sit-mychannel.cdc.ais.th/ais-fibre/?type=logged-in");
        await page.getByText(/ปิด/i).click(); 
        
        
       // const optionLocator = page.getByRole('button', { name: /ตรวจสอบพื้นที่ให้บริการ/i });
        //const optionLocator = page.locator('.option.right-block', { hasText: 'ตรวจสอบพื้นที่ให้บริการ' });
        const optionLocator = page.getByText(/ตรวจสอบพื้นที่ให้บริการ/i, { exact: true }); //ตั้งค่าให้การค้นหา Element "ต้องตรงกับข้อความที่ระบุแบบ 100% (เป๊ะๆ)"

        await optionLocator.waitFor({ state: 'visible', timeout: 60000 }); // รอสูงสุด 15 วินาที
        await optionLocator.click();        
        // await page.getByText(/คอนโด/i).waitFor({ state: 'visible' });
        // await page.getByText(/คอนโด/i).click();





        //1
        await page.getByRole('button', { name: 'คอนโด' }).click({ force: true });
        await page.waitForTimeout(2000); 
        
        // 2. จับภาพหน้าจอเพื่อดูว่า "เห็นอะไร"
        await page.screenshot({ path: 'debug-check.png' });
        
        // 3. ปริ้น HTML ออกมาดูว่าช่องกรอกข้อมูลมันมีชื่อว่าอะไรกันแน่
        const pageHTML = await page.content();
        console.log("--- HTML ของหน้าปัจจุบัน ---");
        console.log(pageHTML.substring(0, 2000)); // ตัดมาแค่ 2000 ตัวอักษรพอ
        
        // 4. ลองหาด้วยวิธีที่หยาบที่สุด (เผื่อ Label ผิด)
        // ใช้การหา Input ทุกตัวในหน้าแล้วนับดู
        const allInputs = await page.locator('input');
        const count = await allInputs.count();
        console.log(`จำนวน Input ทั้งหมดที่พบ: ${count}`);
        
        // ปริ้น Attributes ของ Input ทุกตัวออกมาดู
        for (let i = 0; i < count; i++) {
            const attr = await allInputs.nth(i).evaluate(el => el.getAttribute('placeholder') || el.getAttribute('aria-label') || 'ไม่มี label');
            console.log(`Input ที่ ${i}: ${attr}`);
        }
        
        // 5. สั่งรอ Input แบบเจาะจงที่ตัวที่ 1 (ถ้ามี)
        await allInputs.first().waitFor({ state: 'visible' });

        
        // await page.getByRole('button', { name: 'คอนโด' }).click({ force: true });        
        // const condoInput = page.getByLabel(/กรุณาระบุชื่อคอนโดเพื่อทำการค้นหา/i);
        // // รอให้มันมองเห็น (ถ้ามันซ่อนอยู่ มันจะรอจนกว่าจะแสดงผล)
        // await condoInput.waitFor({ state: 'visible', timeout: 70000 });

        // // ค่อยสั่ง Fill
        // await condoInput.fill('นิช');
        // await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").waitFor();
        // await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").click();
    });







});