class RegistrationPage {
  
  get userNameInput() {
    return cy.get('#signupName');
  }

  get lastNameInput() {
    return cy.get('#signupLastName');
  }

  get emailInput() {
    return cy.get('#signupEmail');
  }

  get passwordInput() {
    return cy.get('#signupPassword');
  }
  get repeatPasswordInput() {
    return cy.get('#signupRepeatPassword');
  }

  get registerButton() {
    return cy.get('.modal-footer>button');
  }



  
  typeUserName(username) {
    this.userNameInput.clear().type(username.trim());
    return this;
  }


  typeLastName(lastname) {
    this.lastNameInput.clear().type(lastname.trim());
    return this;
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  typeRepeatPassword(repeatPassword) {
    this.repeatPasswordInput.clear().type(repeatPassword);
    return this;
  }


  clickRegisterButton() {
    this.registerButton.click();
    return this;
  }
}

export default new RegistrationPage();