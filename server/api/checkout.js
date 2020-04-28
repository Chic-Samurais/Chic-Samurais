const router = require('express').Router()
const {Order, Product, Cart} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product,
          },
        ],
      })

      if (userCart.totalQty) {
        userCart.isComplete = true
        userCart.save()
        res.json(userCart)
      } else {
        res.send(
          'Your cart is empty! Add items to your cart before checking out!'
        )
      }
    } else {
      //this will take the guest cart and make an order
      const guestOrder = await Order.create({
        isComplete: true,
        orderTotal: req.session.cart.totalPrice, //update to match guest cart?
        totalQty: req.session.cart.totalQty,
      })

      const guestCartItems = req.session.cart.items
      for (let id in guestCartItems) {
        if (guestCartItems.hasOwnProperty(id)) {
          let product = await Product.findByPk(Number(id))
          let [orderProduct] = await guestOrder.addProduct(product)
          orderProduct.quantity = guestCartItems[`${id}`].qty
          //vv remember to take this console.log out
          console.log(
            'orderId',
            orderProduct.orderId,
            'productId',
            orderProduct.productId,
            'quantity',
            orderProduct.quantity
          )
          await orderProduct.save()
        }
      }
      const dbGuestOrder = await Order.findByPk(guestOrder.id, {
        include: [{model: Product}],
      })
      //REDIRECT OR MESSAGE HERE?
      if (dbGuestOrder.totalQty) {
        req.session.cart = new Cart({})
        res.json(dbGuestOrder)
      } else {
        res.send(
          'Your cart is empty! Add items to your cart before checking out!'
        )
      }
    }
  } catch (err) {
    next(err)
  }
})
