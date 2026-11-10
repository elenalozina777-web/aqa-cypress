class LoginPage {
  get emailInput() {
    return cy.get("#signinEmail");
  }

  get passwordInput() {
    return cy.get("#signinPassword");
  }

  get loginButton() {
    return cy.get(".modal-footer>button.btn.btn-primary");
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  typePassword(password) {
    this.passwordInput.clear().type(password, {sensitive: true});
    return this;
  }

  clickLoginButton() {
    this.loginButton.click();
    return this;
  }


}
export default new LoginPage();