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

    cy.get("#signinEmail").type("rodrigasGomes@gmail.com");
    cy.get("#signinPassword").type("Mypassword1234");

    cy.get(".modal-footer > button.btn.btn-primary").click();

    cy.url().should("include", "/panel/garage");
  });

  it("Should create a car and save its ID", () => {
    const brand = "Porsche";
    const model = "911";
    const mileage = "35";

    cy.intercept("POST", "**/api/cars").as("createCar");

    GaragePage.addCar(brand, model, mileage);

    cy.wait("@createCar").then((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response.statusCode).to.eq(201);

      const carId = interception.response.body.data.id;

      expect(carId).to.exist;

      cy.wrap(carId).as("createdCarId");
      cy.log(`Created car ID: ${carId}`);

      cy.request("GET", "/api/cars").then((response) => {
        expect(response.status).to.eq(200);

        const createdCar = response.body.data.find((car) => car.id === carId);

        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq("Porsche");
        expect(createdCar.model).to.eq("911");
        expect(createdCar.initialMileage).to.eq(35);
        expect(createdCar.mileage).to.eq(35);
      });

      const expenseData = {
        method: "POST",
        url: "/api/expenses",
        body: {
          carId: carId,
          reportedAt: "2026-11-20",
          mileage: 36,
          liters: 11,
          totalCost: 11,
          forceMileage: false,
        },
      };

      cy.createExpense(expenseData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");

        expect(response.body.data).to.have.property("id");
        expect(response.body.data.carId).to.eq(carId);
        expect(response.body.data.mileage).to.eq(36);
        expect(response.body.data.liters).to.eq(11);
        expect(response.body.data.totalCost).to.eq(11);

        cy.log(`Created expense ID: ${response.body.data.id}`);

        ExpensesPage.open();

        cy.url().should("include", "/panel/expenses");
        cy.contains("td", "20.11.2026")
          .parent("tr")
          .within(() => {
            cy.contains("td", "20.11.2026").should("be.visible");
            cy.contains("td", "36").should("be.visible");
            cy.contains("td", "11L").should("be.visible");
            cy.contains("td", "11.00 USD").should("be.visible");
          });
      });
    });
  });
});
