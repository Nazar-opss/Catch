describe('Authentication tests', () => {
  const email = 'text@example.com'; // change this to a valid email
  const password = 'passwordexample'; // change this to a valid password

  it('first test: creates session via UI', () => {
    cy.login(email, password);
    cy.visit('http://localhost:3000/');
  });

  it('second test: restores cached session', () => {
    cy.login(email, password);
    cy.visit('http://localhost:3000/');
  });
});