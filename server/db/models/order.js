const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  paymentMethod: {
    type: Sequelize.STRING
  }
})

module.exports = Order
