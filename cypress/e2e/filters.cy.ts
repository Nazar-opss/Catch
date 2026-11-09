describe("Filtering on Main page Catch", () => {
  it("success of filtering", () => {
    cy.intercept('GET', '/api/deals?sort=hot').as('getHotDeals')

    cy.visit("http://localhost:3000/");

    cy.wait('@getHotDeals');

    cy.get('[data-cy="loader"]').should("not.exist");

    cy.get('[data-cy="discount-card"]').should('be.visible');

    cy.get('[data-cy="sort-filter"]').should("be.visible").contains("Нові").click();

    cy.url().should("include", "/?sort=new");

    cy.get('[data-cy="sort-filter"]').should("be.visible").contains("Обговорювані").click();

    cy.url().should("include", "/?sort=discussed");
  });
  it("success of filtering by category", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="loader"]').should("not.exist");

    cy.get('[data-cy="category-filter"]').contains("Електроніка").click();

    cy.url().should("include", "category=electronics");
    
    cy.get('[data-cy="category-filter"]')
        .contains('Електроніка')
        .should('have.class', 'text-card');
  });
});
