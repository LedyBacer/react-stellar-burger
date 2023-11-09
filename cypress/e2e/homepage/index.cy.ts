describe('constructor works correctly', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('should open constructor page by default', () => {
        cy.contains('Соберите бургер', { timeout: 4000 });
    });

    it('should have working dnd', () => {
        cy.contains('Краторная булка N-200i').trigger("dragstart").trigger("dragleave");
        cy.contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.contains('Краторная булка N-200i (верх)')

        cy.contains('Соус Spicy-X').trigger("dragstart").trigger("dragleave");
        cy.contains('Краторная булка N-200i (верх)')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.get('[data-handler-id^=T17]')

        cy.contains('Соус фирменный Space Sauce').trigger("dragstart").trigger("dragleave");
        cy.contains('Краторная булка N-200i (верх)')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.get('[data-handler-id^=T19]')

        cy.get('[data-handler-id^=T17]').trigger("dragstart").trigger("dragleave");
        cy.get('[data-handler-id^=T19]')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.get('[data-test^=ingredient_container]').children().first().contains('Соус фирменный Space Sauce')
    });

    it('should have working remove button', () => {
        cy.contains('Соус Spicy-X').trigger("dragstart").trigger("dragleave");
        cy.contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");
        cy.get('[data-handler-id^=T17]')

        cy.get('[class^=constructor-element]').children().get('[class^=constructor-element__action]').click()
        cy.contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа')
    });

    it('should not allow ordering without bun', () => {
        cy.contains('Соус Spicy-X').trigger("dragstart").trigger("dragleave");
        cy.contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.get('button').contains('Оформить заказ').should('be.disabled')
    });

    it('should not allow ordering without login', () => {
        cy.contains('Краторная булка N-200i').trigger("dragstart").trigger("dragleave");
        cy.contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.get('button').contains('Оформить заказ').click();
        cy.location().should(location => expect(location.pathname).to.eq('/login'))
    });

    it('should have working modal ingredients', () => {
        cy.contains('Соус Spicy-X').click();
        cy.contains('Детали ингредиента');
        cy.get('[data-test^=modal]').children().contains('Соус Spicy-X')
        cy.get('[data-test^=modal_header]').children().last().children().click()
        cy.get('[data-test^=modal]').should('not.exist')
    });

    it('should have working ordering', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[name^=email]').type('minecraft.klub@yandenx.ru')
        cy.get('[name^=password]').type('testtest')
        cy.contains('Войти').click()

        cy.contains('Краторная булка N-200i').trigger("dragstart").trigger("dragleave");
        cy.contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop");

        cy.contains('Оформить заказ').click()
        cy.get('[data-test^=modal]').should('exist')
        cy.intercept({
            method: 'POST',
            url: 'https://norma.nomoreparties.space/api/orders',
        }).as('dataGetFirst');
        cy.wait('@dataGetFirst').its('response.statusCode').should('equal', 200)
        cy.contains('Ваш заказ начали готовить').should('exist')

    });

});