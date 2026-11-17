import GaragePage from "./garageExpensesPage/garagePage";
import ExpensesPage from "./garageExpensesPage/expensesPage";

describe("Garage and Expenses tests", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    cy.contains(
      "button.btn.btn-outline-white.header_signin",
      "Sign In",
    ).click();

    cy.env(["login", "password"]).then(({ login, password }) => {
      cy.get("#signinEmail").type(login);
      cy.get("#signinPassword").type(password);

      cy.get(".modal-footer>button.btn.btn-primary").click();

      cy.url().should("include", "/panel/garage");
    });
  });

  it("Should add a new car and add fuel expenses", () => {
    const brand = "Ford";
    const model = "Focus";
    const mileage = "35";

    const date = "17.11.2026";
    const expensesMileage = "40";
    const litre = "5";
    const cost = "350";

    GaragePage.addCar(brand, model, mileage);

    cy.contains(`${brand} ${model}`).should("be.visible");

    ExpensesPage.addExpense(
      brand + " " + model,
      date,
      expensesMileage,
      litre,
      cost,
    );
    cy.wait(1000);
    ExpensesPage.clickAddExButton();
  });
});
