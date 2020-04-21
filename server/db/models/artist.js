const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nationality: {
    type: Sequelize.STRING
  },
  lifeSpan: {
    type: Sequelize.STRING,
    defaultValue: 'Unknown'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg'
  }
})

module.exports = Artist
