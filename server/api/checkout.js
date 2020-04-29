const router = require('express').Router()
const {Order, Product, Cart} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false}
      })
      if (userCart.totalQty) {
        await userCart.update({
          isComplete: true,
          name: req.body.name,
          address: req.body.address
        })
        const finalCart = await Order.findOne({
          where: {id: userCart.id, isComplete: true},
          include: [
            {
              model: Product
            }
          ]
        })
        console.log(finalCart)
        res.json(finalCart)
      } else {
        res.send(
          'Your cart is empty! Add items to your cart before checking out!'
        )
      }
    } else {
      //this will take the guest cart and make an order
      if (!req.session.cart.totalQty) {
        res.send(
          'Your cart is empty! Add items to your cart before checking out!'
        )
      }
      const guestOrder = await Order.create({
        isComplete: true,
        orderTotal: req.session.cart.totalPrice, //update to match guest cart?
        totalQty: req.session.cart.totalQty,
        name: req.body.name,
        address: req.body.address
      })

      // refactor with "generateArray method on cart? Is that a better big O?"
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
        include: [{model: Product}]
      })
      //REDIRECT OR MESSAGE HERE?

      req.session.cart = new Cart({})
      res.json(dbGuestOrder)
    }
  } catch (err) {
    next(err)
  }
})
