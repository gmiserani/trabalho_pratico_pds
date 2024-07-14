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

describe('List-vision', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should login and go to subject list vision page', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.wait(1000);
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
        // cy.get('.subjectMiniature').eq(0).click();
        cy.get('.subjectMiniature', { timeout: 10000 }).eq(0).click();
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
        cy.get('.subjectMiniature', { timeout: 10000 }).eq(0).click();
        cy.get('#addReviewButton', { timeout: 10000 }).eq(0).click();
        cy.url({ timeout: 10000 }).should('match', /\/subject\/[a-z0-9-]+\/add-review/);
    } );
});

describe('Evaluation process', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('deve logar e ir para a página de avaliação ao clicar no item da lista de matérias', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');

        cy.wait(1000);
        cy.get('.subjectMiniature', { timeout: 10000 }).eq(0).click();
        cy.get('#addReviewButton', { timeout: 10000 }).eq(0).click();
        cy.url({ timeout: 10000 }).should('match', /\/subject\/[a-z0-9-]+\/add-review/);

        cy.get('.reviewResponseButtons').eq(0).contains('Sim').click(); // Cobra presença? Sim
        cy.get('.reviewResponseButtons').eq(1).contains('Boa').click(); // Didática do professor: Boa
        cy.get('.reviewResponseButtons').eq(2).contains('Médios').click(); // Trabalhos: Médios
        cy.get('.reviewResponseButtons').eq(3).contains('Médias').click(); // Provas: Médias
        cy.get('.reviewResponseButtons').eq(4).contains('Médio').click(); // Dedicação: Médio
        cy.get('svg[data-testid="StarBorderOutlinedIcon"]').eq(3).click({force: true}); // Nota geral: 4 estrelas
        cy.get('.commentInput textarea').type('Curso muito interessante e desafiador.'); // Preenchendo o campo de comentário

        cy.get('.sendReviewButton').click();
        cy.url().should('include', '/subject/');
    });
});


describe('Frequent-answer-page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should login and go to a subject page, view its evaluations, and check if the average rating is displayed', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.wait(1000);
        cy.get('.subjectMiniature').eq(0).click();
        cy.url().should('include', '/subject/');

        cy.get('.answers').should('be.visible');
    });
});

describe('Sorting functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.wait(2000);
        cy.clearAllCookies();
    });

    it('should display the order button', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.wait(1000);
        // cy.get('[data-cy="order-button"]').should('be.visible');
        cy.get('#demo-customized-button').should('be.visible');
    });

    it('should display items in ascending order by overall rating when the "Menor Avaliação" option is selected', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.wait(1000);
        cy.get('#demo-customized-button').click();
        cy.get('input[value="asc"]').click();
        cy.get('.subjectMiniature').then((items) => {
            const originalOrder = Array.from(items).map((item) => {
                const rating = parseFloat(item.getAttribute('data-rating'));
                return { element: item, rating: rating };
            });
            const sortedOrder = [...originalOrder].sort((a, b) => a.rating - b.rating);
            const sortedItems = sortedOrder.map((item) => item.element.innerText);
            const originalItems = originalOrder.map((item) => item.element.innerText);
            expect(originalItems).to.deep.equal(sortedItems);
        });
    });

    it('should display items in descending order by overall rating when the "Maior Avaliação" option is selected', () => {
        cy.get('.text-input').eq(0).type('bella@prisma.io');
        cy.get('.text-input').eq(1).type('123');
        cy.get('.entrar').click();
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:5173/');
        cy.wait(1000);
        cy.get('#demo-customized-button').click();
        cy.get('input[value="desc"]').click();
        cy.get('.subjectMiniature').then((items) => {
            const originalOrder = Array.from(items).map((item) => {
                const rating = parseFloat(item.getAttribute('data-rating'));
                return { element: item, rating: rating };
            });
            const sortedOrder = [...originalOrder].sort((a, b) => b.rating - a.rating);
            const sortedItems = sortedOrder.map((item) => item.element.innerText);
            const originalItems = originalOrder.map((item) => item.element.innerText);
            expect(originalItems).to.deep.equal(sortedItems);
        });
    });
});