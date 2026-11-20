class ExpensesPage {
  get addButton() {
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
  /*get calendarButton() {
    return this.reportDate.parent().find("button.date-picker-toggle");
  }*/

  get mileageInput() {
    return cy.get("#addExpenseMileage");
  }

  get numberOfLiters() {
    return cy.get("#addExpenseLiters");
  }

  get totalCost() {
    return cy.get("#addExpenseTotalCost");
  }

  get addExButton() {
    return cy.get(".modal-footer").contains("Add");
  }
  clickAddExButton() {
    this.addExButton.wait(1000).click();
    return this;
  }

  addExpense(vehicle, data, expensesMileage, litre, cost) {
    this.addButton.click();

    //cy.get(".modal-content").should("be.visible");

    this.vehicleDropdown.select(vehicle).blur();

    this.reportDataInput.clear().type(data).blur();
    this.mileageInput.clear().type(expensesMileage);
    this.numberOfLiters.clear().type(litre);
    this.totalCost.clear().type(cost);

    return this;
  }

  /* open() {
    cy.visit("/panel/expenses", {
      failOnStatusCode: false,
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    return this;
  }*/
}

export default new ExpensesPage();
