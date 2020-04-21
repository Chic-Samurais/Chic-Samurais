const Sequelize = require('sequelize')
const db = require('../db')

const Poster = db.define('poster', {
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
  year: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn2.iconfinder.com/data/icons/creative-11/64/painting-art-canvas-picture-512.png',
    validate: {
      isUrl: true
    }
  },
  dimensions: {
    type: Sequelize.STRING,
    defaultValue: '24 x 36 inches'
  },
  price: {
    type: Sequelize.FLOAT(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Poster
