describe("Garlaxy login", () => {
  const garlaxyUrl = Cypress.env("GARLAXY_URL");
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test when user gets redirected to login
    // because she/he is not authenticated.
    return false;
  });

  it("should allow user to login", () => {
    cy.visit(garlaxyUrl);
    cy.get("#username").type("e2e@groupe13.arla-sigl.fr");
    cy.get("#password").type("Sigl2022!").type("{enter}");
  });
  it("should display garlaxy home page", () => {
    cy.get(".header").should("be.visible");
    cy.get(".header").should("contain.text", "GARLAXY");
  });
  it("shoudl redirect user to login after logout", () => {
    cy.get(".logout").click();
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
  });
});
