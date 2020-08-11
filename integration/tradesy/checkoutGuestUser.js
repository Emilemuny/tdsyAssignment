import faker from 'faker'

let itemTestData = require('../../fixtures/tradesyTestData')

const cartItem = itemTestData[Math.floor(Math.random() * itemTestData.length)]

context('Checkout With Guest User', () => {

  beforeEach(() =>{
    cy.restoreLocalStorageCache();
    cy.visit('/')
  })

  afterEach(() => {
  cy.saveLocalStorageCache();

});

  const custFirstName = faker.name.firstName()
  const custLastName = faker.name.lastName()
  const custEmail = faker.internet.email()

  it('Add Items and Complete Guest user Checkout', () => {
    cy.addItemToCart(cartItem.itemNo, cartItem.price)
    cy.get('.checkout-button').click()
    cy.get('.js-login-tab-guest').click()
    cy.get('.checkout-login__guest > :nth-child(2) > .btn').click()
    cy.addShippingAddress(custFirstName, custLastName, custEmail)
    cy.wait(5000)
    cy.get('#checkout-onsite').check({force: true}).should('be.checked') // Select Payment Method Credit/Debit Card
    cy.addDebitCreditPaymentInfo(custFirstName, custLastName)
    cy.get('.checkout__right-column > .checkout-order-summary__button-wrapper > .order-submit > .btn').click() // Place Order
  })

})
