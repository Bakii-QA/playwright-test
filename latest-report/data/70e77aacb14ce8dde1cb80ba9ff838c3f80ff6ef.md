# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ExTest.spec.js >> ทดสอบการไหล Flow >> TC-04 Register your account
- Location: tests/ExTest.spec.js:85:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Testing Guide' })
Expected: visible
Timeout: 40000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 40000ms
  - waiting for getByRole('button', { name: 'Testing Guide' })

```

```yaml
- main:
  - img "Icon for practicesoftwaretesting.com"
  - heading "practicesoftwaretesting.com" [level=1]
  - heading "Performing security verification" [level=2]
  - paragraph: This website uses a security service to protect against malicious bots. This page is displayed while the website verifies you are not a bot.
- contentinfo:
  - text: "Ray ID:"
  - code: a16cf9baae573ecb
  - text: Performance and Security by
  - link "Cloudflare":
    - /url: https://www.cloudflare.com?utm_source=challenge&utm_campaign=m
  - link "Privacy":
    - /url: https://www.cloudflare.com/privacypolicy/
```

# Test source

```ts
  44  | 
  45  |         if (!usernameValue || !finalValue) {
  46  |             console.log("Username หรือ Password ว่างอยู่");
  47  |         } else {
  48  |             console.log("Username และ Password มีค่าครบถ้วน");
  49  |         }
  50  |         
  51  |         //page.keyboard.type('123'); เป็นคำสั่งพิมต่อจากข้อความเดิมเช่น
  52  |         // await page.keyboard.type('123'); // พิมพ์ 123
  53  |         // await page.locator('input[type="button"]').click(); // กดปุ่ม
  54  |         // await page.keyboard.type('456'); // พิมพ์ 456 ต่อเข้าไป (ผลลัพธ์จะเป็น 123456)
  55  | 
  56  |         await page.locator('button', { has: page.locator('[data-icon="eye-slash"]') }).click();
  57  | 
  58  |         //วิธีคลิกปุ่มเมื่อจอเล็ก :1 
  59  |         // await page.mouse.wheel(0, 500);
  60  |         // await page.locator('input[data-test="login-submit"]').click();
  61  | 
  62  |         //วิธีคลิกปุ่มเมื่อจอเล็ก :2
  63  |         let clickCount = 0;
  64  |         const submitBtn = page.locator('input[data-test="login-submit"]');
  65  |         await submitBtn.scrollIntoViewIfNeeded(); 
  66  |         await submitBtn.click();
  67  |         clickCount++; // บวกค่าเพิ่ม 1
  68  |         console.log("มีการคลิกเเล้ว",clickCount +"ครั้ง");
  69  | 
  70  |         const count = await page.locator('input[data-test="login-submit"]').count();
  71  |         console.log("จำนวนปุ่มที่เจอคือ:", count);
  72  | 
  73  |         const a = page.locator('[data-test="login-error"]');
  74  |         await expect(a).toBeVisible();
  75  |         await expect(a).toContainText("Invalid email or password");
  76  | 
  77  |         // ใช้ toHaveText ถ้าต้องการเช็คว่าข้อความตรงกันแบบเป๊ะๆ
  78  |        // await expect(a).toHaveText("Invalid email or password");
  79  |         
  80  |         // หรือใช้ toContainText ถ้าต้องการเช็คแค่ว่ามีข้อความนี้ปรากฏอยู่ (แนะนำตัวนี้มากกว่า เพราะยืดหยุ่นกว่า)
  81  |        // await expect(a).toContainText("Invalid email or password");
  82  | 
  83  |     })
  84  | 
  85  |     test('TC-04 Register your account',async({page})=>{
  86  | 
  87  |         await page.locator('[data-test="nav-sign-in"]').click();
  88  |         const register = await page.locator('a[data-test="register-link"]');
  89  |         await register.scrollIntoViewIfNeeded(); 
  90  |         await register.click();
  91  |         await page.locator('input[data-test="first-name"]').fill("Baaki-QA");
  92  |         await page.locator('input[data-test="last-name"]').fill("Engineer");
  93  | 
  94  |         const dobField = page.locator('[data-test="dob"]');
  95  |         await dobField.fill("1999-11-12");
  96  |         await dobField.press('Tab');
  97  | 
  98  |         const scroll = page.locator('select[data-test="country"]');
  99  |         await scroll.scrollIntoViewIfNeeded(); 
  100 |         await scroll.selectOption("Thailand");
  101 | 
  102 |         const sc = page.locator('input[data-test="phone"]');
  103 |         await sc.scrollIntoViewIfNeeded();
  104 | 
  105 |         await page.locator('input[data-test="postal_code"]').fill("10270");
  106 |         await page.locator('input[data-test="house_number"]').fill("85/54");
  107 |         await expect(page.locator('input[data-test="street"]')).toHaveValue('Abel Fords', { timeout: 5000 });
  108 |         await expect(page.locator('input[data-test="city"]')).toHaveValue('West Melany', { timeout: 5000 });
  109 |         await expect(page.locator('input[data-test="state"]')).toHaveValue('Pennsylvania', { timeout: 5000 });
  110 |         await page.pause();
  111 | 
  112 |         const timestamp = Date.now();
  113 |         const email = `testuser_${timestamp}@example.com`;
  114 |         const password = `UserPass@${Date.now()}!12323`;
  115 |         await page.locator('input[data-test="phone"]').fill("0893443321");
  116 |         await page.locator('input[data-test="email"]').fill(email);
  117 |         console.log("ค่าของ email คือ",email);
  118 |         await page.locator('input[data-test="password"]').fill(password);
  119 | 
  120 |         await page.locator('button', { has: page.locator('[data-icon="eye"]') }).click();
  121 |         await page.locator('button[data-test="register-submit"]').click();
  122 | 
  123 | 
  124 | 
  125 |         await page.screenshot({ path: 'debug-after-click.png' }); // แคปไว้ดูว่าหน้าเว็บเป็นไง
  126 | 
  127 |         // 3. ตรวจสอบ URL ปัจจุบัน
  128 |         const currentUrl = page.url();
  129 |         console.log("URL ปัจจุบันคือ:", currentUrl);
  130 | 
  131 |         // 4. ถ้า URL ยังไม่เปลี่ยน แสดงว่า Register ไม่ผ่าน
  132 |         try {
  133 |             await page.waitForURL('https://practicesoftwaretesting.com/auth/login', { timeout: 10000 }); 
  134 |         } catch (error) {
  135 |             // ถ่ายรูปตอนที่รอไม่สำเร็จเพื่อดูหน้าตาของหน้าเว็บหลังจากพยายามสมัครแล้ว
  136 |             await page.screenshot({ path: 'failure-state.png' });
  137 |             throw new Error("ระบบไม่ยอมเปลี่ยนหน้าหลังจากกด Register (อาจเกิดจาก API Error หรือหน้าเว็บค้าง)");
  138 |         }
  139 |         const now = page.url();
  140 | 
  141 |         console.log("URL คือ:", now);
  142 | 
  143 | 
> 144 |         await expect(page.getByRole('button', { name: 'Testing Guide' })).toBeVisible();
      |                                                                           ^ Error: expect(locator).toBeVisible() failed
  145 |     //     await page.locator('input[data-test="email"]').fill(email);
  146 |     //    await page.locator('input[data-test="password"]').fill(password);
  147 |     //    await page.locator('button[data-test="login-submit"]').click();
  148 | 
  149 | 
  150 |         
  151 |         
  152 |         
  153 | 
  154 |         // กรณีทำเช็คเรื่อง ค่าที่ไม่ถูก
  155 |         // ลองกรอกค่ามั่วๆ เข้าไป
  156 |         // await dobField.fill('invalid-date');
  157 |         // await dobField.press('Tab');
  158 | 
  159 |         // // ตรวจสอบว่าระบบขึ้น Error จริงไหม (เช็คจาก class 'is-invalid')
  160 |         // await expect(dobField).toHaveClass(/is-invalid/);
  161 | 
  162 |         // // ตรวจสอบข้อความแจ้งเตือน (ถ้ามี element ที่แสดงข้อความ error)
  163 |         // const errorMessage = page.locator('#dob-error'); // อ้างอิงจาก aria-describedby
  164 |         // await expect(errorMessage).toBeVisible();
  165 | 
  166 | 
  167 | 
  168 | 
  169 | 
  170 |     })
  171 | 
  172 | 
  173 | 
  174 | 
  175 | 
  176 | 
  177 | 
  178 | })
```