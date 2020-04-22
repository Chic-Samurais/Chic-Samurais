const router = require('express').Router()
const {Order} = require('../db/models')
const {PosterOrder} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          through: {
            attributes: ['id', 'email']
            //anything else to include?
          }
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
