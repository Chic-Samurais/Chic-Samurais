const router = require('express').Router()
const {Order, User, Product, OrderProduct} = require('../db/models')
module.exports = router

//GETORDERTOTAL HELPER FUNCTION
//this may be unnecessary?
//admin may not need to see a unfinished order total
function getOrderTotal(products) {
  return products.reduce((total, product) => {
    total += product.price * product.orderProduct.quantity
    return total
  }, 0)
}

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const orders = await Order.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'email']
          }
        ]
      })
      res.json(orders)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [
        {
          model: User,
          attributes: ['id', 'email']
        },
        {
          model: Product
        }
      ]
    })
    if (req.user && (req.user.id === order.userId || req.user.isAdmin)) {
      res.json(order)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

//WOULD WE NEED THESE IF WE HAVE CART ROUTES TO MANIPULATE CARTs
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
