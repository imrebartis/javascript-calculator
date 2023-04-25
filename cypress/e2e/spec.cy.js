/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://127.0.0.1:8080/');
  });

  it('performs addition', () => {
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="plus"]').click();
    cy.get('[data-cy="3"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', '4');
  });

  it('performs subtraction', () => {
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="minus"]').click();
    cy.get('[data-cy="9"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', '-2');
  });

  it('performs multiplication', () => {
    cy.get('[data-cy="5"]').click();
    cy.get('[data-cy="times"]').click();
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', '40');
  });

  it('performs division', () => {
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', '2');
  });

  it('accepts input with max 10 digits length', () => {
    for (let i = 0; i < 12; i++) {
      cy.get('[data-cy="4"]').click();
    }
    cy.get('[data-cy="viewer"]').should('have.text', '4444444444');
  });

  it('disallows . from being entered multiple times', () => {
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="num"]').click();
    cy.get('[data-cy="0"]').click();
    cy.get('[data-cy="num"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', '7.01');
  });

  it('displays "Not a number" if operator clicked twice', () => {
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="9"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', 'Not a number');
  });

  it('displays "Not a number" if an operator clicked after the other', () => {
    cy.get('[data-cy="5"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="minus"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', 'Not a number');
  });

  it('displays "Oh my" if number is divided by zero', () => {
    cy.get('[data-cy="6"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="0"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', 'Oh my');
  });

  it('clears everything when clear button is pressed', () => {
    cy.get('[data-cy="6"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="viewer"]').should('have.text', '0');
  });

  it('displays the reset button if number is divided by zero', () => {
    cy.get('[data-cy="6"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="0"]').click();
    cy.get('[data-cy="equals"]').click();
    cy.get('body').contains('Reset calculator?');
  });

  it('clicking the reset button reloads page', () => {
    cy.get('[data-cy="6"]').click();
    cy.get('[data-cy="divided-by"]').click();
    cy.get('[data-cy="0"]').click();
    cy.get('[data-cy="equals"]').click();
    // mark the window object to "know" when it gets reloaded
    cy.window().then((w) => (w.beforeReload = true));
    // the new property is there initially
    cy.window().should('have.prop', 'beforeReload', true);
    cy.get('[data-cy="reset"]').click();
    // after reload the property shouldn't be there anymore
    cy.window().should('not.have.prop', 'beforeReload');
  });
});
