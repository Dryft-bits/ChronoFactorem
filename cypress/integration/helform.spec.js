/// <reference types="cypress" />

context('Helform', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/helform');
  })

  it('should select a slot', () => {
    cy.get('input[placeholder="Please select slot"]').click();
    cy.get('div[class*="menuItem"]').should('have.length', 8);
    cy.get('div[class*="menuItem"]:first').click();
    cy.get('input[value="1:30 - 2:00 PM"]');
  })

  it('should select 1 branch', () => {
    cy.get('div[class*="control"]').click();
    cy.get('div[class*="menu"]').children().first().click();
  })
})