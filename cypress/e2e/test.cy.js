describe ('test', () => {
    it ('test', () => {
        cy.visit ('https://example.cypress.io/commands/querying')
        cy.get ('#query-btn').click()
    })
})