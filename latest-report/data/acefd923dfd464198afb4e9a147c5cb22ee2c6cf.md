# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Mobile888.spec.js >> เทสการเปิดเบอร์ 888 >> เปิด E2E
- Location: tests/Mobile888.spec.js:8:5

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 40000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - img [ref=e5]
  - generic [ref=e8]:
    - generic [ref=e11]: แพ็กเกจ AIS | 3BB Fibre3
    - generic [ref=e13]:
      - tablist [ref=e16]:
        - generic [ref=e17]:
          - tab "FBB Icon แพ็กเกจ FBB Fibre" [ref=e18] [cursor=pointer]:
            - generic [ref=e20]:
              - img "FBB Icon" [ref=e21]
              - generic [ref=e22]: แพ็กเกจ FBB Fibre
          - tab "Location Icon ตรวจสอบพื้นที่ให้บริการ" [selected] [ref=e23] [cursor=pointer]:
            - generic [ref=e25]:
              - img "Location Icon" [ref=e26]
              - generic [ref=e27]: ตรวจสอบพื้นที่ให้บริการ
      - generic:
        - tabpanel "Location Icon ตรวจสอบพื้นที่ให้บริการ"
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e31]:
          - button "คอนโด" [ref=e32]:
            - generic [ref=e33]: คอนโด
          - button "บัตรประชาชนและอื่นๆ" [ref=e36]:
            - generic [ref=e37]: บัตรประชาชนและอื่นๆ
        - generic [ref=e42]:
          - button "TH" [ref=e43]:
            - generic [ref=e44]: TH
          - button "EN" [ref=e47]:
            - generic [ref=e48]: EN
      - generic [ref=e54]:
        - generic [ref=e55]:
          - heading "กรุณาเลือกวิธีการตรวจสอบ" [level=1] [ref=e56]
          - img [ref=e58]
          - heading "เสียบบัตร ที่เครื่องอ่าน เพื่อทำการตรวจสอบข้อมูล" [level=1] [ref=e59]:
            - text: เสียบบัตร ที่เครื่องอ่าน
            - text: เพื่อทำการตรวจสอบข้อมูล
        - generic [ref=e61]:
          - heading "หรือ" [level=3] [ref=e62]
          - button "ถ่ายรูปบัตรประชาชน" [ref=e64]:
            - generic [ref=e65]: ถ่ายรูปบัตรประชาชน
          - button "อัพโหลดรูปภาพ" [ref=e69]:
            - generic [ref=e70]: อัพโหลดรูปภาพ
          - button "ค้นหาจากเบอร์เอไอเอส" [ref=e74]:
            - generic [ref=e75]: ค้นหาจากเบอร์เอไอเอส
```

# Test source

```ts
  1  | // git pull origin main ดึง code ล่าสุดจาก git
  2  | 
  3  | const {test , expect} = require('@playwright/test');
  4  | 
  5  | test.describe("เทสการเปิดเบอร์ 888",async()=>{
  6  | 
  7  | 
  8  |     test("เปิด E2E",async({page})=>{
  9  |         await page.goto("https://sit-mychannel.cdc.ais.th/ais-fibre/login/callback-signin");
  10 |         await page.getByText(" ตกลง ").click();    
  11 |         await page.locator('#mat-select-value-0').click();
  12 | 
  13 |         await page.locator('#mat-option-2').getByText('Temporary login').click();        
  14 |         await page.getByRole('button', { name: 'Next' }).click();
  15 |         await page.locator("#usernameUserInput").fill("somjateh");
  16 |         await page.getByTestId('login-page-password-input').fill('MyChannel#May26');
  17 |         await page.getByTestId('login-page-continue-login-button').click();
  18 |         await page.waitForLoadState('networkidle');
  19 |         await page.goto("https://sit-mychannel.cdc.ais.th/ais-fibre/?type=logged-in");
  20 |         await page.getByText(" ปิด ").click();    
  21 |         await page.locator('.option.right-block').click();
> 22 |         await page.waitForLoadState('networkidle');
     |                    ^ Error: page.waitForLoadState: Test timeout of 40000ms exceeded.
  23 |         await page.getByText(/คอนโด/i).click();    
  24 |         await page.waitForLoadState('networkidle');
  25 |         const inputField = page.locator('#mat-input-0'); 
  26 |         await inputField.waitFor({ state: 'visible', timeout: 15000 });
  27 |         // 2. ทำ Action เติมข้อความ
  28 |         await inputField.fill("นิช");
  29 |         await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").waitFor();
  30 |         await page.getByText("เดอะ นิช โมโน รัชวิภา อาคาร บี (ไฟเบอร์) ตึก").click();
  31 |     });
  32 | 
  33 | 
  34 | 
  35 | 
  36 | 
  37 | 
  38 | 
  39 | });
```