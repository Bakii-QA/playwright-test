// models/LoginPage.js
class LoginPage {
    constructor(page) {
      this.page = page;
      this.passwordField = page.locator('input[type="password"]');
      this.eyeButton = page.locator('button', { has: page.locator('[data-icon="eye"]') });
    }
  
    async fillPassword(pass) {
      await this.passwordField.fill(pass);
    }
  
    async togglePassword() {
      await this.eyeButton.click();
    }
  
    async getPasswordValue() {
      return await this.passwordField.inputValue();
    }
  }
  module.exports = { LoginPage };