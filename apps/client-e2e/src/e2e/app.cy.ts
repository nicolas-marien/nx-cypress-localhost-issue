import { getGreeting } from '../support/app.po';

describe('client', () => {
  beforeEach(() => {
    cy.login('email@domain.com')
    cy.visit('/')
  });

  it('should be authenticate', () => {
    cy.get('#button').click()
    cy.wait(1000)
    cy.get('#auth').should('be.visible')
  })

});
