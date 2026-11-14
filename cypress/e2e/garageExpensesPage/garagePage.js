class GaragePage {
  get addCarButton() {
    return cy.contains("button", "Add car");
  }

  get brandDropdown() {
    return cy.get("#addCarBrand");
  }

  get modelDropdown() {
    return cy.get("#addCarModel");
  }

  get mileageInput() {
    return cy.get("#addCarMileage");
  }
  get addButton() {
    return cy.get(".modal-footer").contains("Add");
  }

  clickAddCarButton() {
    this.addCarButton.click();

    cy.get(".modal-content").should("be.visible");

    return this;
  }

  chooseCarBrand(brand) {
    this.brandDropdown.select(brand);
    return this;
  }

  chooseCarModel(model) {
    this.modelDropdown.select(model);
    return this;
  }

  typeMileage(mileage) {
    this.mileageInput.type(mileage);
    return this;
  }

  clickAddButton() {
    this.addButton.click();
    return this;
  }

  addCar(brand, model, mileage) {
    this.clickAddCarButton();
    this.chooseCarBrand(brand);
    this.chooseCarModel(model);
    this.typeMileage(mileage);
    this.clickAddButton();
    return this;
  }

  open() {
    cy.visit("/panel/garage", { failOnStatusCode: false });
    return this;
  }
}

export default new GaragePage();
