const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn2.iconfinder.com/data/icons/creative-11/64/painting-art-canvas-picture-512.png',
    validate: {
      isUrl: true
    }
  },
  price: {
    // update type to integer // look into getters 'get()'/setters or instance methods for converting to dollars and cents
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
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Product
