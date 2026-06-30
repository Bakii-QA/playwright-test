# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Mobile888.spec.js >> เทสการเปิดเบอร์ 888 >> เปิด E2E
- Location: tests/Mobile888.spec.js:11:5

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 40000ms exceeded.
Call log:
  - waiting for getByText(/ตรวจสอบพื้นที่ให้บริการ/i) to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e8]:
    - img [ref=e10]
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13]:
          - img [ref=e15]
          - heading [level=1] [ref=e16]: Log in
        - heading [level=3] [ref=e17]: Select Your Login
        - generic [ref=e21] [cursor=pointer]:
          - generic [ref=e22]: Temporary login
          - combobox [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e27]: Temporary login
              - img [ref=e30]
      - generic [ref=e33]:
        - button [ref=e34] [cursor=pointer]: Next
        - generic [ref=e35]:
          - generic [ref=e37] [cursor=pointer]: ลืมรหัสผ่านสําหรับพนักงาน
          - generic [ref=e39] [cursor=pointer]: ลืมรหัสผ่านสําหรับตัวแทนจําหน่าย (พนักงานขาย)
      - generic [ref=e41]:
        - paragraph [ref=e43] [cursor=pointer]: Contact Helpdesk for Employee
        - paragraph [ref=e45] [cursor=pointer]: Contact CCC for Partner
  - dialog [active] [ref=e50]:
    - generic [ref=e54]:
      - generic [ref=e55]:
        - img [ref=e56]
        - generic [ref=e57]: ขออภัยในความไม่สะดวก
        - generic [ref=e58]: ระบบปิดให้บริการชั่วคราว เพื่อปรับปรุงประสิทธิภาพการให้บริการ ในวันที่ 30 มิถุนายน 2569 เวลา 22:00 น. ถึง วันที่ 01 กรกฎาคม 2569 เวลา 07:00 น. กรุณาเข้าใช้งานอีกครั้งภายหลัง
      - button "ตกลง" [ref=e60]:
        - generic [ref=e61]: ตกลง
```

# Test source

```ts
  1  | // // git pull origin main ดึง code ล่าสุดจาก git
  2  | // ถ้า Error เกี่ยวกับ Timeout: แสดงว่าเรา "รีบไป" หรือ "หาเป้าหมายไม่เจอ" (ให้เช็ค: เงื่อนไขการรอ, ลำดับของหน้าเว็บ)
  3  | // ถ้า Error เกี่ยวกับ Element intercepted: แสดงว่ามี "อะไรมาบัง" (ให้เช็ค: Loader, Modal, หรือ Z-index)
  4  | // ถ้า Error เกี่ยวกับ Context closed: แสดงว่าหน้าเว็บ "หนีไปแล้ว" (ให้เช็ค: การเปลี่ยน URL, การเปิด Tab ใหม่)
  5  | 
  6  | const {test , expect} = require('@playwright/test');
  7  | 
  8  | test.describe("เทสการเปิดเบอร์ 888",async()=>{
  9  | 
  10 | 
  11 |     test("เปิด E2E",async({page})=>{
  12 |         await page.goto("https://sit-mychannel.cdc.ais.th/ais-fibre/login/callback-signin");
  13 |         await page.getByText(" ตกลง ").click();    
  14 |         await page.locator('#mat-select-value-0').click();
  15 | 
  16 |         await page.locator('#mat-option-2').getByText('Temporary login').click();        
  17 |         await page.getByRole('button', { name: 'Next' }).click();
  18 |         await page.locator("#usernameUserInput").fill("somjateh");
  19 |         await page.getByTestId('login-page-password-input').fill('MyChannel#May26');
  20 |         await page.getByTestId('login-page-continue-login-button').click();
  21 |         await page.waitForLoadState('networkidle');
  22 |         await page.goto("https://sit-mychannel.cdc.ais.th/ais-fibre/?type=logged-in");
  23 |         await page.getByText(/ปิด/i).click(); 
  24 |         
  25 |         
  26 |        // const optionLocator = page.getByRole('button', { name: /ตรวจสอบพื้นที่ให้บริการ/i });
  27 |         //const optionLocator = page.locator('.option.right-block', { hasText: 'ตรวจสอบพื้นที่ให้บริการ' });
  28 |         const optionLocator = page.getByText(/ตรวจสอบพื้นที่ให้บริการ/i); // exact: true  ตั้งค่าให้การค้นหา Element "ต้องตรงกับข้อความที่ระบุแบบ 100% (เป๊ะๆ)"
  29 | 
> 30 |         await optionLocator.waitFor({ state: 'visible', timeout: 60000 }); // รอสูงสุด 15 วินาที
     |                             ^ Error: locator.waitFor: Test timeout of 40000ms exceeded.
  31 |         await optionLocator.click();        
  32 |         // await page.getByText(/คอนโด/i).waitFor({ state: 'visible' });
  33 |         // await page.getByText(/คอนโด/i).click();
  34 |         await page.getByRole('button', { name: 'คอนโด' }).click({ force: true });        
  35 |         
  36 |         const condoInput = page.locator('#mat-input-2');
  37 |         // 2. รอให้มันพร้อมและพิมพ์
  38 |         await condoInput.waitFor({ state: 'visible', timeout: 30000 });
  39 |         await condoInput.click();
  40 |         await condoInput.pressSequentially('นิช', { delay: 150 });
  41 | 
  42 |         // 3. รอให้รายการคอนโดที่ต้องการแสดงขึ้นมา (ใช้ Locator ที่เจาะจงที่ span class="building-name")
  43 |         // เราใช้ .locator('text=...') เพื่อหาชื่อโครงการให้เจอแม้จะมีช่องว่างแฝง
  44 |         const targetCondo = page.locator('span.building-name').filter({ hasText: 'เดอะ นิช โมโน รัชวิภา อาคาร บี' });
  45 | 
  46 |         // 4. รอให้รายการเด้งขึ้นมา แล้วค่อยคลิก
  47 |         await targetCondo.waitFor({ state: 'visible', timeout: 30000 });
  48 |         await targetCondo.click();
  49 | 
  50 | 
  51 |     });
  52 | 
  53 | 
  54 | 
  55 | 
  56 | 
  57 | });
```