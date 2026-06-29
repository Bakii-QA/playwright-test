const {test , expect} = require('@playwright/test');

test.describe("เทสการเปิดเบอร์ 888",async()=>{


    test("เปิด E2E",async({page})=>{
        await page.goto("https://sit-mychannel.cdc.ais.th/ais-fibre/login/callback-signin");
        await page.getByText(" ตกลง ").click();    
        await page.locator('#mat-select-value-0').click();

        await page.locator('#mat-option-2').getByText('Temporary login').click();        
        await page.getByRole('button', { name: 'Next' }).click();
        await page.locator("#usernameUserInput").fill("nukornsa");
        await page.getByTestId('login-page-password-input').fill('myPassword123');
        await page.getByTestId('login-page-continue-login-button').click();






    });







});