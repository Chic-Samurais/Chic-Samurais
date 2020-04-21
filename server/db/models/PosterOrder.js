const Sequelize = require('sequelize')
const db = require('../db')

const PosterOrder = db.define('posterOrder', {
  cost: {
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
