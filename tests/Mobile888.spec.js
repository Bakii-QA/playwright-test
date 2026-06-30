// // git pull origin main ดึง code ล่าสุดจาก git
// ถ้า Error เกี่ยวกับ Timeout: แสดงว่าเรา "รีบไป" หรือ "หาเป้าหมายไม่เจอ" (ให้เช็ค: เงื่อนไขการรอ, ลำดับของหน้าเว็บ)
// ถ้า Error เกี่ยวกับ Element intercepted: แสดงว่ามี "อะไรมาบัง" (ให้เช็ค: Loader, Modal, หรือ Z-index)
// ถ้า Error เกี่ยวกับ Context closed: แสดงว่าหน้าเว็บ "หนีไปแล้ว" (ให้เช็ค: การเปลี่ยน URL, การเปิด Tab ใหม่)

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
        
        const condoInput = page.locator('#mat-input-2');
        // 2. รอให้มันพร้อมและพิมพ์
        await condoInput.waitFor({ state: 'visible', timeout: 30000 });
        await condoInput.click();
        await condoInput.pressSequentially('นิช', { delay: 150 });

        // 3. รอให้รายการคอนโดที่ต้องการแสดงขึ้นมา (ใช้ Locator ที่เจาะจงที่ span class="building-name")
        // เราใช้ .locator('text=...') เพื่อหาชื่อโครงการให้เจอแม้จะมีช่องว่างแฝง
        const targetCondo = page.locator('span.building-name').filter({ hasText: 'เดอะ นิช โมโน รัชวิภา อาคาร บี' });

        // 4. รอให้รายการเด้งขึ้นมา แล้วค่อยคลิก
        await targetCondo.waitFor({ state: 'visible', timeout: 30000 });
        await targetCondo.click();


    });





});