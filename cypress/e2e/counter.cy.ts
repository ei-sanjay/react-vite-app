import { ROUTES } from '../../src/config/routes';

describe('Counter page', () => {
  it('increments and decrements the counter', () => {
    cy.visit(ROUTES.COUNTER);
    cy.get('[data-testid="counter-value"]').should('have.text', '0');

    cy.get('[data-testid="counter-increment"]').click();
    cy.get('[data-testid="counter-value"]').should('have.text', '1');

    cy.get('[data-testid="counter-increment"]').click();
    cy.get('[data-testid="counter-value"]').should('have.text', '2');

    cy.get('[data-testid="counter-decrement"]').click();
    cy.get('[data-testid="counter-value"]').should('have.text', '1');
  });
});
