const Sequelize = require('sequelize')
const db = require('../db')

// Any calculations keep in the backend.
// calculate price per product by multiplying quantity and price here
// calculate total order price by summing the result from line 5

const OrderProduct = db.define('orderProduct', {
  // update variable and table name
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  subtotal: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('price') * this.getDataValue('quantity')
    }
  }
})

module.exports = OrderProduct
