/* eslint-disable no-undef */
/// <reference types="cypress" />


describe('E2E tests', () => {
    const random = Math.floor(Math.random() * 100000);

    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should be in login url', () => {
        cy.url().should('eq', 'http://localhost:5173/login');
    });

    it('should displays input fields', () => {
        cy.get('.text-input').should('have.length', 2);
    });

    it('should go to sign up page', () => {
        cy.get('.signup').click();
        cy.url().should('include', '/signup');
    });

    it('should fill in sign up form', () => {
        cy.get('.signup').click();
        cy.wait(2000);
        cy.get('.text-input').eq(0).type('test');
        cy.get('.text-input').eq(1).type('test' + random);
        cy.get('.text-input').eq(2).type('test' + random + '@test.com');
        cy.get('.text-input').eq(3).type('Ciencia da computacao');
        cy.get('.text-input').eq(4).type('1');
        cy.get('.text-input').eq(5).type('test123');
        cy.get('.entrar').click();
        cy.url().should('eq', 'http://localhost:5173/');
    });

    it('should login and go a subject page when clicking on suvjects list item', () => {
        cy.get('.text-input').eq(0).type('test' + random + '@test.com');
        cy.get('.text-input').eq(1).type('test123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.wait(1000);
        cy.get('.subjectMiniature').eq(0).click();
        cy.url().should('include', '/subject/');
    });

    it('should login and logout', () => {
        cy.get('.text-input').eq(0).type('test' + random + '@test.com');
        cy.get('.text-input').eq(1).type('test123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('include', '/');
        cy.wait(1000);
        cy.get('.header').find('.logoutLink').click();
        cy.url().should('eq', 'http://localhost:5173/login');
    });
});