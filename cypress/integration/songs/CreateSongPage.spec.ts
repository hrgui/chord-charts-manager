/// <reference types="cypress" />

context("Waiting", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/song/new", {
      onBeforeLoad(win) {
        delete win.fetch;
      },
    });
    cy.viewport(1366, 768);
  });

  it("cy.wait() - wait for a specific amount of time", () => {
    cy.server();
    const x = cy.get("input[name=title]");
    x.clear();
    x.type("My Song");

    cy.wait(1000);
    cy.get("input[name=artist]").clear();
    cy.get("input[name=artist]").type("My Artist");
    cy.wait(1000);
    cy.get("input[name=youtube]").clear();
    cy.get("input[name=youtube]").type(
      "https://www.youtube.com/watch?v=Jbe7OruLk8I"
    );
    cy.wait(1000);

    cy.route({
      url: "http://localhost:4000/graphql",
      method: "POST",
    }).as("saveSong");

    cy.get("button[type=submit]").click();
    cy.wait("@saveSong").its("status").should("eq", 200);
  });
});
