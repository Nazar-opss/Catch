describe('Main page of Catch', () => {
  it('success of visiting the main page and viewing discounts', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-cy="discounts-list"]').should('be.visible')

    cy.get('[data-cy="discount-card"]').should('be.visible')

    cy.get('[data-cy="discount-card"]').first().click()

    cy.url().should('include', '/deal/')
  })
})