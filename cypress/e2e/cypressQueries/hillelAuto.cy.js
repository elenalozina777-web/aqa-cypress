describe ('Test header and futer ', () => {

    beforeEach ('Auth', () => {
        cy.visit ('https://qauto.forstudy.space/', {
            auth: {
                username: "guest",
                password: "welcome2qauto"
            }
        })
  })
  it ('Check buttons in header', () => {
          cy.contains('.btn.header-link', 'About').should('be.visible')
          cy.contains('.btn.header-link', 'Contacts').should('be.visible')
          cy.contains('button.header-link.-guest', 'Guest log in').should('be.visible')
          cy.contains('button.btn.btn-outline-white.header_signin', 'Sign In').should('be.visible')
  })

  it ('Check sosials links in footer', () => {
          cy.get('.socials_link').eq(0).should('be.visible')
          cy.get('.socials_link').eq(1).should('be.visible')
          cy.get('.socials_link').eq(2).should('be.visible')
          cy.get('.socials_link').eq(3).should('be.visible')
          cy.get('.socials_link').eq(4).should('be.visible')
  })

  it ('Check contact links in footer', () => {
          cy.get('a.contacts_link.display-4').should('be.visible')
          cy.get( 'a.contacts_link.h4').should('be.visible')
  })

  });
         
     

    
