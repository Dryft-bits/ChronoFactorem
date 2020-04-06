/// <reference types="cypress" />

context('Save TimeTable', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/create', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('timetable');
      },
    });
  })

  it('timetable should have component in it', () => {
    cy.get('[id="BIO F110"]').click();
    cy.get('h5[id="L1"]').click();
    cy.get('button[name="Change Course"]').click();
    cy.get('.gridItem').should('have.length', 1);
  })

  it('timetable should save', () => {
    cy.get('[id="BIO F110"]').click();
    cy.get('h5[id="L1"]').click();
    cy.get('button[name="Change Course"]').click();
    cy.contains('Save TimeTable');
  })
})