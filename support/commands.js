// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("addItemToCart", (itemNo, price) => {
  cy.get('.header-search__input').type(itemNo).type('{enter}')
  cy.get('.item-image').click()
  cy.get('[data-testid=idp-cta]').scrollIntoView().click() // Add to Bag
  cy.get('.item-interstitial-cart-total').should('have.text', '$'+price)
  cy.url().should('contain', itemNo)
})

Cypress.Commands.add("addShippingAddress", (firstName, lastName, emailaddress) => {
  cy.get('.checkout-shipping__form [name="name"]').click().type(firstName+' '+lastName)
  cy.get('.checkout-shipping__form [name="street1"]').click().type("1018 Riley St")
  cy.get('.checkout-shipping__form [name="zip"]').click().type(95630)
  cy.get('.checkout-shipping__form [name="city"]').click().type("Folsom")
  cy.get('.shipping_fields_us > .js-required-input').select("California").should('have.value', 'CA')
  cy.get('.checkout-shipping__form [name="country_code"]').select("United States")
  cy.get('.checkout-shipping__form [name="email"]').click().type(emailaddress)
  cy.get('.checkout-shipping__form [type="submit"]').click() // Use this Address button.
})

Cypress.Commands.add("addDebitCreditPaymentInfo", (firstName, lastName) => {
  cy.get('[name="cardnumber"]').type("4111 1111 1111 1111")
  cy.get('[name="exp-date"]').type("1125")
  cy.get('[name="cvc"]').type("123")
  cy.get('#billing_name').click().type(firstName+' '+lastName)
  cy.get('.checkout-card [type="submit"]').click() // Add Card
})

Cypress.Commands.add("login", (userEmailAddress, userPassword) => {
  cy.get('.user-nav__log-in').click()
  cy.get('#login_email').click().type(userEmailAddress).should('have.value', userEmailAddress)
  cy.get('#login_password').click().type(userPassword).should('have.value', userPassword)
  cy.get('#login-button').click()
})
