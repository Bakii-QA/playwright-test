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
        const optionLocator = page.getByText(/ตรวจสอบพื้นที่ให้บริการ/i); // exact: true  ตั้งค่าให้การค้นหา Element "ต้องตรงกับข้อความที่ระบุแบบ 100% (เป๊ะๆ)"

        await optionLocator.waitFor({ state: 'visible', timeout: 60000 }); // รอสูงสุด 15 วินาที
        await optionLocator.click();        
        // await page.getByText(/คอนโด/i).waitFor({ state: 'visible' });
        // await page.getByText(/คอนโด/i).click();
        await page.getByRole('button', { name: 'คอนโด' }).click({ force: true });        
        const condoInput = page.getByLabel(/กรุณาระบุชื่อคอนโดเพื่อทำการค้นหา/i);
        // // รอให้มันมองเห็น (ถ้ามันซ่อนอยู่ มันจะรอจนกว่าจะแสดงผล)
        // await condoInput.waitFor({ state: 'visible', timeout: 70000 });



        // 1. ตรวจสอบให้มั่นใจว่าเห็นแล้วและคลิกให้ Focus ก่อน
        await condoInput.scrollIntoViewIfNeeded();
        await condoInput.click({ force: true }); // บังคับคลิกเพื่อให้มัน Focus

        // 2. ใช้การส่งค่าแบบคีย์บอร์ด (ไม่ใช่ fill) ในกรณีที่เป็นระบบ Auto-complete
        // บางครั้ง .fill() มันวางข้อมูลทีเดียว แต่ .pressSequentially() จะค่อยๆ พิมพ์
        await condoInput.pressSequentially('นิช', { delay: 200 });

        // 3. หลังจากพิมพ์แล้ว ต้องให้เวลาหน้าเว็บโหลด "Dropdown" รายชื่อคอนโดขึ้นมา
        // ถ้า .waitFor() ตรงๆ แล้วพัง ให้ลองใช้ waitForTimeout ดูว่ามันขึ้นไหม
        await page.waitForTimeout(3000);



        
        // ค่อยสั่ง Fill
        // await condoInput.fill('นิช', { delay: 100 });        
        // await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").waitFor();
        // await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").click();
    });





});