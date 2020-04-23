const router = require('express').Router()
const {Order, User, Product} = require('../db/models')
// const {PosterOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User
          // through: {
          //   attributes: ['id', 'email'],
          //   //anything else to include?
          // },
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [
        {
          model: User
          // through: {
          // attributes: ['id', 'email'],
          //   //anything else to include?
          // },
        },
        {
          model: Product
          // through: {
          // attributes: ['id', 'email'],
          //   //anything else to include?
          // },
        }
      ]
    })
    // order.total = order.total / 100 // consider where this is being pulled from, do we divide from order products
    order.total =
      order.products
        .map(product => product.orderProduct.subtotal)
        .reduce((curr, subtotal) => {
          return curr + subtotal
        }, 0) / 100

    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body) //destructure off of here??
    res.json(newOrder) // res.redirecct?? what do we want rendered here/sent to redux store???
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    const updated = await order.update(req.body) // hide/destructure somehow?
    res.json(updated) // what do we want sent? possibility of redirect?
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.userId)
    await order.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
