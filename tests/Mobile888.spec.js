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
        const optionLocator = page.getByText(/ตรวจสอบพื้นที่ให้บริการ/i, { exact: true });

        await optionLocator.waitFor({ state: 'visible', timeout: 60000 }); // รอสูงสุด 15 วินาที
        await optionLocator.click();        
        await page.getByText(/คอนโด/i).waitFor({ state: 'visible' });
        await page.getByText(/คอนโด/i).click();
        await page.waitForLoadState('networkidle');


        const condoInput = page.getByLabel(/กรุณาระบุชื่อคอนโดเพื่อทำการค้นหา/i);

        const count = await condoInput.count();
        console.log(`ตอนนี้เจอช่อง Input ทั้งหมด: ${count} ช่อง`);
        
        if (count === 0) {
            // ถ้าไม่เจอ อาจต้องกดอะไรบางอย่างซ้ำ หรือรอให้มากกว่านี้
            console.log("ยังไม่เจอช่อง Input, ลองเพิ่มเวลาคอย...");
        }

        // รอให้มันมองเห็น (ถ้ามันซ่อนอยู่ มันจะรอจนกว่าจะแสดงผล)
        await condoInput.waitFor({ state: 'attached', timeout: 60000 });
        // ค่อยสั่ง Fill
        await condoInput.fill('นิช');
        await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").waitFor();
        await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").click();
    });







});