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

  // The contents of the above it, should be broken into several small steps each having their own validation points.
  // Example: - Add items to the shopping bag. Validate (add assertions) that the items were added.
  //           - Go to the checkout page. Validate the items is added to the checkout by looking at number of items, price and url.
  //           - Add shipping info. Validate shipping info is added properly
  //           - Add payments. Validate payment is added by adding assertions to verify last four digits of the card could be seen at the payment section
  //           - Add assertions to verify the "Review Order" section. assertions for shipping, tax and totals.
  //

})
