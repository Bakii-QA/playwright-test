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
        const optionLocator = page.locator('.option.right-block');
        await optionLocator.waitFor({ state: 'visible', timeout: 30000 }); // รอสูงสุด 15 วินาที
        await optionLocator.click();        
        await page.getByText(/คอนโด/i).waitFor({ state: 'visible' });
        await page.getByText(/คอนโด/i).click();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('กรุณาระบุชื่อคอนโดเพื่อทำการค้นหา').fill('นิช');        // 2. ทำ Action เติมข้อความ
        await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").waitFor();
        await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").click();
    });







});