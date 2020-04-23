const Sequelize = require('sequelize')
const db = require('../db')

// Any calculations keep in the backend.
// calculate price per product by multiplying quantity and price here
// calculate total order price by summing the result from line 5

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderProduct
