const Sequelize = require('sequelize')
const db = require('../db')

// Any calculations keep in the backend.
// calculate price per product by multiplying quantity and price here
// calculate total order price by summing the result from line 5

const PosterOrder = db.define('posterOrder', {
  // update variable and table name
  cost: {
    // update to price// also integer
    type: Sequelize.FLOAT(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})

// PosterOrder.total = function()

module.exports = PosterOrder
