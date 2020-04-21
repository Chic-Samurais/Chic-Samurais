const Sequelize = require('sequelize')
const db = require('../db')

const ArtworkOrder = db.define('artworkOrder', {
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

// ArtworkOrder.total = function()

module.exports = ArtworkOrder
