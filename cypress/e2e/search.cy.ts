describe("Search bar on Main page Catch", () => {
  it("success of typing in search and finding deals", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="loader"]').should("not.exist");

    cy.get('[data-cy="search-input"]').should("be.visible");

    cy.get('[data-cy="search-input"]').type("apple{enter}");

    cy.url().should("include", "/?q=apple");

    cy.get('[data-cy="discount-card"]').each(($card) => {
      cy.wrap($card).should("include.text", "Apple");
    });
  });
});
