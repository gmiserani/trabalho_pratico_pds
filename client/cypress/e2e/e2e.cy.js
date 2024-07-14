/* eslint-disable no-undef */
/// <reference types="cypress" />


describe('Login', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should login and logout', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('include', '/');
        cy.wait(1000);
        cy.get('.header').find('.logoutLink').click();
        cy.url().should('eq', 'http://localhost:5173/login');
    });
});

describe('Sign up', () => {
    const random = Math.floor(Math.random() * 100000);

    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should fill in sign up form and create account', () => {
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
});

describe('Subject-page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should login and go a subject page when clicking on subjects list item', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.wait(1000);
        cy.get('.subjectMiniature').eq(0).click();
        cy.url().should('include', '/subject/');
    });
});

describe('Evaluation-page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should login and go a evaluation page when clicking on evaluations list item', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/'); //confirma que a url permanece a mesma após o login
        cy.wait(1000);
        // clicar em uma disciplina antes?
        cy.get('.evaluationMiniature').eq(0).click();
        cy.url().should('include', '/evaluation/'); //confirma que a url mudou para a página de avaliação
    } );
});

