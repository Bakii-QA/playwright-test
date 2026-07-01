const {expect , test ,beforeEach} = require('@playwright/test')

test.describe('ทดสอบการไหล Flow',()=>{
    beforeEach('Start',async ({page})=> {
        await page.goto("https://practicesoftwaretesting.com/");
    })

    test('TC01-open Testing Guide For Test',async({page})=>{
        const a = await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
        console.log("ตรวจสอบชื่อคือ",a);
        await page.getByRole('button',{name: 'Testing Guide' }).click();
        await page.pause();
    })










})