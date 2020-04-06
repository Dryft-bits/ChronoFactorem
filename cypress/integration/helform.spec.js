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
    cy.get('div[class*="menu"]').children().children().eq(0).click();
  })

  it('should not select more than 2 branchs', () => {
    cy.get('div[class*="control"]').click();
    cy.get('div[class*="menu"]').children().children().eq(0).click();
    cy.get('div[class*="control"]').click();
    cy.get('div[class*="menu"]').children().children().eq(1).click();
    cy.get('div[class*="control"]').click();
    cy.get('div[class*="menu"]').children().contains('You cannot select more than 2 branches');
  })

  it('should select 1 hel course', () => {
    cy.get('ul[class="courseSearch"]').within(() => {
      cy.get('div[id="BITS F214"]').click();
    });
    cy.get('div[class="container-helform"]').within(() => {
      cy.get('input[value="BITS F214 Science Tech & Modernity"]');
    });
  })

  it('should delete add hel course', () => {
    cy.get('ul[class="courseSearch"]').within(() => {
      cy.get('div[id="BITS F214"]').click();
    });
    cy.get('div[class="container-helform"]').within(() => {
      cy.get('input[value="BITS F214 Science Tech & Modernity"]');
      cy.get('button').first().click();
    });
    cy.get('div[class="form-courses"]').children().should('have.length', 0);
  })
})
