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
    const brand = "Porsche";
    const model = "911";
    const mileage = "35";

    const date = "2026-11-12";
    const expensesMileage = 50;
    const litre = "15";
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
    ExpensesPage.open();
    cy.url().should("include", "/panel/expenses");
  });
});
