import faker from 'faker'

let itemTestData = require('../../fixtures/tradesyTestData')
let registeredUsers = require('../../fixtures/registeredUsers')

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

  it('Login, Add Items and Complete registered user Checkout', () => {
    cy.login(registeredUsers.userEmailAddress, registeredUsers.userPassword)
    cy.addItemToCart(cartItem.itemNo, cartItem.price)
    cy.get('.checkout-button').click()
    cy.addShippingAddress(custFirstName, custLastName, custEmail)
    cy.get('#checkout-onsite').check({force: true}).should('be.checked') // Select Payment Method Credit/Debit Card
    cy.addDebitCreditPaymentInfo(custFirstName, custLastName)
    cy.get('.checkout__right-column > .checkout-order-summary__button-wrapper > .order-submit > .btn').click() // Place Order
  })

})
