describe('constructor works correctly', () => {
    beforeEach(() => {
        cy.visit('');
    })

    it('should open constructor page by default', () => {
        cy.contains('Соберите бургер', { timeout: 4000 });
    });

    it('should have working dnd', () => {
        cy.contains(Cypress.env('bun')).trigger("dragstart").trigger("dragleave");
        cy.contains(Cypress.env('dnd_drop'))
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.contains(Cypress.env('bun_up')).as('bun_up')

        cy.contains(Cypress.env('ingredient1')).trigger("dragstart").trigger("dragleave");
        cy.get('@bun_up')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.get(Cypress.env('ingredient1_data')).as('ingredient1_data')

        cy.contains(Cypress.env('ingredient2')).trigger("dragstart").trigger("dragleave");
        cy.get('@bun_up')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.get(Cypress.env('ingredient2_data')).as('ingredient2_data')

        cy.get('@ingredient1_data').trigger("dragstart").trigger("dragleave");
        cy.get('@ingredient2_data')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.get('[data-test^=ingredient_container]').children().first().contains(Cypress.env('ingredient2'))
    });

    it('should have working remove button', () => {
        cy.contains(Cypress.env('ingredient1')).trigger("dragstart").trigger("dragleave");
        cy.contains(Cypress.env('dnd_drop'))
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.get(Cypress.env('ingredient1_data'))

        cy.get('[class^=constructor-element]').children().get('[class^=constructor-element__action]').click()
        cy.contains(Cypress.env('dnd_drop'))
    });

    it('should not allow ordering without bun', () => {
        cy.contains(Cypress.env('ingredient1')).trigger("dragstart").trigger("dragleave");
        cy.contains(Cypress.env('dnd_drop'))
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.get('button').contains(Cypress.env('order_btn')).should('be.disabled')
    });

    it('should not allow ordering without login', () => {
        cy.contains(Cypress.env('bun')).trigger("dragstart").trigger("dragleave");
        cy.contains(Cypress.env('dnd_drop'))
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.get('button').contains(Cypress.env('order_btn')).click();
        cy.location().should(location => expect(location.pathname).to.eq('/login'))
    });

    it('should have working modal ingredients', () => {
        cy.contains(Cypress.env('ingredient1')).click();
        cy.contains('Детали ингредиента');
        cy.get('[data-test^=modal]').children().contains(Cypress.env('ingredient1'))
        cy.get('[data-test^=modal_header]').children().last().children().click()
        cy.get('[data-test^=modal]').should('not.exist')
    });

    it('should have working ordering', () => {
        cy.visit('login')
        cy.get('[name^=email]').type(Cypress.env('email'))
        cy.get('[name^=password]').type(Cypress.env('pass'))
        cy.contains('Войти').click()

        cy.contains(Cypress.env('bun')).trigger("dragstart").trigger("dragleave");
        cy.contains(Cypress.env('dnd_drop'))
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.contains(Cypress.env('order_btn')).click()
        cy.get('[data-test^=modal]').should('exist')
        cy.intercept({
            method: 'POST',
            url: Cypress.env('api_order'),
        }).as('dataGetFirst');
        cy.wait('@dataGetFirst').its('response.statusCode').should('equal', 200)
        cy.contains('Ваш заказ начали готовить').should('exist')
    });

});