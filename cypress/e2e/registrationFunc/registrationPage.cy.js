import RegistrationPage from "./registrationPage.js";
import { faker } from "@faker-js/faker";



describe("Registration Page tests", () => {
  beforeEach("Auth", () => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    cy.contains(
      "button.btn.btn-outline-white.header_signin",
      "Sign In",
    ).click();
    cy.contains("button.btn.btn-link", "Registration").click();
  });

  it('Visible name "Registration"', () => {
    //cy.contains ('.modal-title', "Registration").should(be.visible)
    cy.contains(".modal-title", "Registration").should("be.visible");
  });

  it('Field "Name" positive cases', () => {
    RegistrationPage.typeUserName("Oleksiya")
      .typeUserName("    Olena  ")
      .typeUserName("Hi")
      .typeUserName("qwertyuioplkjhgfdsaz");
  });

  it('Field "Name" negative cases', () => {
    //Empty field
    RegistrationPage.userNameInput.focus().blur();
    cy.contains("Name required").should("be.visible");

    //Wrong data
    RegistrationPage.userNameInput.type("Ghytr543!");
    cy.contains("Name is invalid").should("be.visible");
    //Wrong length <2  (1)
    RegistrationPage.typeUserName("G");
    cy.contains("Name has to be from 2 to 20 characters long").should(
      "be.visible",
    );
    // Wrong length > 20 (21)
    RegistrationPage.typeUserName("Gwertyuioplkjhgfdsazxc");
    cy.contains("Name has to be from 2 to 20 characters long").should(
      "be.visible",
    );
    //Border color red when name length is 1 charecter
    RegistrationPage.typeUserName("G");
    RegistrationPage.userNameInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  ///////
  it('Field "Last name" positive cases', () => {
    RegistrationPage.typeLastName("Grande")
      .typeLastName("    Grande  ")
      .typeLastName("Hi")
      .typeLastName("qwertyuioplkjhgfdsaz");
  });

  it('Field "Last name" negative cases', () => {
    //Empty field
    RegistrationPage.lastNameInput.focus().blur();
    cy.contains("Last name required").should("be.visible");

    //Wrong data
    RegistrationPage.typeLastName("Ghytr543!");
    cy.contains("Last name is invalid").should("be.visible");
    //Wrong length <2  (1)
    RegistrationPage.typeLastName("G");
    cy.contains("Last name has to be from 2 to 20 characters long").should(
      "be.visible",
    );
    // Wrong length > 20 (21)
    RegistrationPage.typeLastName("Gwertyuioplkjhgfdsazxc");
    cy.contains("Last name has to be from 2 to 20 characters long").should(
      "be.visible",
    );
    //Border color red when name length is 1 charecter
    RegistrationPage.typeLastName("G");
    RegistrationPage.lastNameInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  ////////
  it('Field "Email" positive cases', () => {
    RegistrationPage.typeEmail("olena@gmail.com");
  });

  it('Field "Email name" negative cases', () => {
    //Wrong data
    RegistrationPage.emailInput.type("nicknick").blur().click();
    cy.contains("Email is incorrect").should("be.visible");

    //Empty field
    RegistrationPage.emailInput.clear().focus().blur();
    cy.contains("Email required").should("be.visible");

    //Border color red when name length is 1 charecter
    RegistrationPage.typeEmail("G");
    RegistrationPage.emailInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });
  //////
  it('Field "Password" positive cases ', () => {
    RegistrationPage.typePassword("Asdfgh123!");
  });

  it('Field "Password" negative cases ', () => {
    //Wrong  data <8 simbols(7)
    RegistrationPage.passwordInput.type("As1drew").blur().click();
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
    //Wrong data >15 simbols(16)
    RegistrationPage.typePassword("As1!ndndhdgfjska");
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
    //Without 1 integer
    RegistrationPage.typePassword("Asuhuygft");
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
    //Without 1 capital letter
    RegistrationPage.typePassword("fgthjjjhs1");
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");
    //Without 1 small letter
    RegistrationPage.typePassword("1234FGTRDD1");
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ).should("be.visible");

    // Empty field
    RegistrationPage.passwordInput.clear().focus().blur();

    cy.contains("Password required").should("be.visible");

    RegistrationPage.passwordInput.should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  ///////
  it("Re-enter password should be the same as the password", () => {
    RegistrationPage.typePassword("Asdfgh123!");
    RegistrationPage.typeRepeatPassword("Asdfgh123!");

    RegistrationPage.repeatPasswordInput.should("have.value", "Asdfgh123!");
  });

  it("Re-enter password should be the same as the password", () => {
    RegistrationPage.typePassword("Asdfgh123!");
    RegistrationPage.repeatPasswordInput
      .clear()
      .type("Asdfgh123!de")
      .blur()
      .click();

    cy.contains("Passwords do not match").should("be.visible");
  });

  //////
  it("Button 'Register' should register successfully with valid data", () => {
    const name = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();

    RegistrationPage.typeUserName(name)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePassword("Asdfgh123!")
      .typeRepeatPassword("Asdfgh123!")
      .clickRegisterButton();
    cy.url().should("include", "/panel/garage");
  });

  it("Button 'Register' should be disabled if data incorrect", () => {
    const name = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();

    RegistrationPage.typeUserName(name)
      .typeLastName(lastName)
      .typeEmail(email)
      .typePassword("Asdfgh123!")
      .typeRepeatPassword("Asdfgh123!loker");
    cy.contains(".modal-footer>button", "Register").should("be.disabled");
  });

  



});
