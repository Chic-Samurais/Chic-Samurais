const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  total: {
    type: Sequelize.INTEGER
  }
  // firstName: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmpty: false
  //   }
  // },
  // lastName: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmpty: false
  //   }
  // },
  // fullName: {
  //   type: Sequelize.VIRTUAL,
  //   get() {
  //     return (
  //       this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
  //     )
  //   }
  // },
  // address: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmpty: false
  //   }
  // }
})

module.exports = Order
