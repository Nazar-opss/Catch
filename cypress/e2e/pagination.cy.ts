describe("Pagination on Main page Catch", () => {
  it("success of pagination", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="loader"]').should("not.exist");

    cy.get('[data-cy="discount-card"]').should("be.visible");

    cy.scrollTo("bottom");

    cy.get('[data-cy="discount-card"]').last().scrollIntoView();

    cy.get('[data-cy="discounts-list"]')
      .find('[data-cy="discount-card"]')
      .should("have.length", 16);

    cy.get('[data-cy="load-more-button"]').click();

    cy.get('[data-cy="discounts-list"]')
      .find('[data-cy="discount-card"]')
      .should("have.length", 24)
      .then(($cards) => {
        const ids = $cards.map((i, el) => el.getAttribute("data-id")).get();
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).to.equal(ids.length);
    });
  });
});
