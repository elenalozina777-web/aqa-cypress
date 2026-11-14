class ExpensesPage {
  get addExpensesButton() {
    return cy
      .get("button.car_add-expense.btn.btn-success")
      .contains("Add fuel expense");
  }

  get vehicleDropdown() {
    return cy.get("#addExpenseCar");
  }

  get reportDataInput() {
    return cy.get("#addExpenseDate");
  }

  get mileageInput() {
    return cy.get("#addExpenseMileage");
  }

  get numberOfLiters() {
    return cy.get("#addExpenseLiters");
  }

  get totalCost() {
    return cy.get("#addExpenseTotalCost");
  }

  get clickAddExButton() {
    return cy
      .get("app-add-expense-modal")
      .contains("button", "Add")
      .should("be.visible");
  }

  addExpense(vehicle, data, expensesMileage, litre, cost) {
    this.addExpensesButton.click();

    cy.get(".modal-content").should("be.visible");

    this.vehicleDropdown.select(vehicle).blur();

    this.reportDataInput.clear().type(data).blur();
    this.mileageInput.clear().type(expensesMileage).blur();
    this.numberOfLiters.clear().type(litre).blur();
    this.totalCost.clear().type(cost).blur();

    this.clickAddExButton.click();

    return this;
  }
  open() {
    cy.visit("/panel/expenses", {
      failOnStatusCode: false,
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    return this;
  }
}

export default new ExpensesPage();
