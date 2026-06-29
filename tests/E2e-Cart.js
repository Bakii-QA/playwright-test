const {test , expect , beforeEach} = require('@playwright/test');

test.describe.only('ทดสอบ Function ไหล Flow',async()=>{
    beforeEach(async({page})=>{
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await expect(page).toHaveTitle("Let's Shop");
        const title = await page.title();
        console.log("หัวข้อคือ",title);
    });







});

 





    
    








    
    
    
    
    
    
    
    
    
    
    
    