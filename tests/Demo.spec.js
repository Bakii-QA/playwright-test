const {test, beforeEach} = require('@playwright/test')

test.describe('test function login',async()=>{
    beforeEach(async({page})=>{
            await page.goto('assadadsasd');
    });

    test('กรอก username/pass',async({page})=>{
        await page.locator("#sdaad").fill("username");
        await page.locator("#pass").fill("password");
        await page.locator("#signin").click();

        const aa = page.locator("#danger")
        await expect(aa).toBeVisible();
        await expect(aa).toContext("asdda");


    });




});