const Sequelize = require('sequelize')
const db = require('../db')

//ADD ADDRESS INFO?!? HOW WOULD THAT SYNC WITH THE GUEST and USER CART? FROM A UX EXPERIENCE
const Order = db.define('order', {
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  }
})

Order.prototype.getOrderTotal = function() {
  return this.products.reduce((total, product) => {
    total += product.price * product.orderProduct.quantity
  }, 0)
}

module.exports = Order
