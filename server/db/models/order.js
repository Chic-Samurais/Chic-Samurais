const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  total: {
    type: Sequelize.INTEGER
    //allowNull: false?
  }
})

module.exports = Order
