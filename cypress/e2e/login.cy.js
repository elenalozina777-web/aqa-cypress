describe("Login with custom command", () => {
  it("Login", () => {
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
    cy.login("rodrigasGomes@gmail.com", "Mypassword1234");
    cy.get("#signinPassword").type("superSecret123", { sensitive: true });

    cy.url().should("include", "/panel/garage");
  });
});
