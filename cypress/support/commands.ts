/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export {}

declare global {
  // Cypress custom commands are declared through namespace augmentation.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit('http://localhost:3000/login');

        cy.get('[data-cy="email-input"]').type(email);

        cy.get('[data-cy="password-input"]').type(password);
        
        cy.intercept('POST', '/api/auth/sign-in/email').as('loginRequest');
        cy.get('[data-cy="login-button"]').click();
        cy.wait('@loginRequest')

        cy.url().should('not.include', '/login');
    })
})