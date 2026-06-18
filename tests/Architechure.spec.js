// // 📌 เรานำเข้าแค่ฟังก์ชันธรรมดา ไม่ต้องนำเข้า Type (Locator, Page) เหมือน TS แล้ว
// import { expect } from '@playwright/test'; 

// export class LoginPage {
  
//   // 1. กำหนดจุดชี้เป้า (Locators) ใน Constructor ทันที
//   constructor(page) {
//     this.page = page; // รับ page context มาเก็บไว้ใช้งานในคลาส
//     this.usernameInput = page.locator('#username');
//     this.passwordInput = page.locator('#password');
//     this.loginButton = page.locator('button[type="submit"]');
//     this.errorMessage = page.locator('.error-flash');
//   }

//   // 2. สร้าง Actions (ฟังก์ชันทำงาน) ประจำหน้านี้
//   async goto() {
//     await this.page.goto('https://example.com/login');
//   }

//   async login(user, pass) {
//     await this.usernameInput.fill(user);
//     await this.passwordInput.fill(pass);
//     await this.loginButton.click();
//   }
// }


//   // การดึงนำไปใช้
// // tests/login.spec.js
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/login.page.js'; // 📌 อย่าลืมใส่ .js ท้ายชื่อไฟล์ตอน import

// test.describe('ฟีเจอร์เข้าสู่ระบบ (Login Feature)', () => {

//   test('เคสที่ 1: ควรเข้าสู่ระบบสำเร็จเมื่อใส่ Username และ Password ถูกต้อง', async ({ page }) => {
//     // 1. สร้างตัวแทนของหน้า Login ขึ้นมา (ดึงโครงสร้างที่เราเขียนไว้มาใช้)
//     const loginPage = new LoginPage(page);

//     // 2. สั่งให้เปิดหน้าเว็บ Login
//     await loginPage.goto();

//     // 3. เรียกใช้ฟังก์ชัน Login โดยส่งข้อมูลจำลองเข้าไป
//     await loginPage.login('mario_speedwagon', 'SuperSecretPassword!');

//     // 4. ตรวจสอบผลลัพธ์ (Assertion) ว่าระบบพาไปหน้า Dashboard จริงไหม
//     await expect(page).toHaveURL('https://example.com/dashboard');
//   });

//   test('เคสที่ 2: ควรแสดงข้อความเตือนเมื่อใส่รหัสผ่านผิด', async ({ page }) => {
//     const loginPage = new LoginPage(page);

//     await loginPage.goto();
    
//     // ลองส่งรหัสผ่านที่ผิดเข้าไป
//     await loginPage.login('mario_speedwagon', 'WrongPassword123');

//     // 5. ตรวจสอบว่า Element ข้อความแจ้งเตือน (errorMessage) แสดงขึ้นมาบนหน้าจอจริง
//     await expect(loginPage.errorMessage).toBeVisible();
//     await expect(loginPage.errorMessage).toHaveText('Your username is invalid!');
//   });

// });
