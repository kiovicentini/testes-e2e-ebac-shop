/// <reference types="cypress" />

import infoCadastro from "../support/page_objects/info.cadastro.page";
const dadosCadastro = require ('../fixtures/adress.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        

        cy.AddProduto('Atlas Fitness Tank', 'XL', 'Blue', '2')

        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click()

        cy.AddProduto('Abominable Hoodie', 'XL', 'Green', '2')

        cy.get('.tbay-woocommerce-breadcrumb > :nth-child(2) > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()

        cy.AddProduto('Atomic Endurance Running Tee (Crew-Neck)', 'L', 'Black', '2')

        cy.go('back')
        cy.go('back')

        cy.AddProduto('Atomic Endurance Running Tee (V-neck)', 'L', 'Blue', '2')

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

        infoCadastro.EditarInfoCadastro(
            dadosCadastro[1].nome,
            dadosCadastro[1].sobrenome,
            dadosCadastro[1].empresa,
            dadosCadastro[1].pais,
            dadosCadastro[1].endereco,
            dadosCadastro[1].numero,
            dadosCadastro[1].cidade,
            dadosCadastro[1].estado,
            dadosCadastro[1].cep,
            dadosCadastro[1].telefone,
            dadosCadastro[1].email

        )
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')




    });


})