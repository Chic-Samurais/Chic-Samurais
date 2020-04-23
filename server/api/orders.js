const router = require('express').Router()
const {Order, User, Product, OrderProduct} = require('../db/models')
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
          // },
        },
        {
          model: Product
        }
      ]
    })
    if (!order.isComplete) {
      order.total =
        order.products
          .map(product => product.price * product.orderProduct.quantity)
          .reduce((curr, subtotal) => {
            return curr + subtotal
          }, 0) / 100
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body) //destructure off of here??

    // newOrder.total = newOrder.products
    //   .map(product => product.price * product.orderProduct.quantity)
    //   .reduce((curr, subtotal) => {
    //     return curr + subtotal
    //   }, 0) / 100

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
    const order = await Order.findByPk(req.params.orderId)
    await order.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId/:productId', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {orderId: req.params.orderId, productId: req.params.productId}
    })
    res.json(orderProduct) // what do we want sent? possibility of redirect?
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {orderId: req.params.orderId, productId: req.params.productId}
    })
    const updated = await orderProduct.update(req.body) // hide/destructure somehow?
    res.json(updated) // what do we want sent? possibility of redirect?
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {orderId: req.params.orderId, productId: req.params.productId}
    })
    await orderProduct.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
