const router = require('express').Router()
const {Order, Product, OrderProduct, Cart} = require('../db/models')
module.exports = router

//GETORDERTOTAL AND GETTOTALQTY HELPER FUNCTIONS
function getOrderTotal(products) {
  return products.reduce((total, product) => {
    total += product.price * product.orderProduct.quantity
    return total
  }, 0)
}

function getTotalQty(products) {
  return products.reduce((total, product) => {
    total += product.orderProduct.quantity
    return total
  }, 0)
}

//"VIEW CART" FOR LOGGED IN USERS OR GUESTS
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const [userCart, created] = await Order.findOrCreate({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product,
          },
        ],
      })
      userCart.orderTotal = getOrderTotal(userCart.products)
      userCart.totalQty = getTotalQty(userCart.products)
      userCart.save()
      res.json(userCart)
    } else {
      const cart = new Cart(req.session.cart ? req.session.cart : {})
      req.session.cart = cart
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

//EMPTY ENTIRE CART FOR LOGGED IN USERS AND GUESTS
router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
      })
      const emptied = await userCart.removeProducts(
        await userCart.getProducts()
      )
      console.log('number of products removed is: ', emptied)
      const emptiedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product,
          },
        ],
      })
      //may not be necessary, but recalculating the orderTotal with helper fxn to make sure that functionality of emptying cart is working properly
      emptiedCart.orderTotal = getOrderTotal(emptiedCart.products)
      emptiedCart.totalQty = getTotalQty(userCart.products)
      emptiedCart.save()
      res.json(emptiedCart)
    } else if (!req.session.cart) {
      res.send('Your cart is empty')
    } else {
      const cart = new Cart(req.session.cart ? req.session.cart : {})
      cart.clearCart()
      req.session.cart = cart
      res.json(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})

//ADDING/POSTING A NEW, UNIQUE ITEM TO A CART Or increments existing item
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (req.user) {
      const [userCart, created] = await Order.findOrCreate({
        where: {userId: req.user.id, isComplete: false},
      })
      const orderProduct = await OrderProduct.findOne({
        where: {orderId: userCart.id, productId: req.params.productId},
      })
      if (!orderProduct) {
        await userCart.addProduct(product)
      } else {
        await orderProduct.update({
          quantity: orderProduct.quantity + 1,
        })
      }
      const updatedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product,
          },
        ],
      })
      updatedCart.orderTotal = getOrderTotal(updatedCart.products)
      updatedCart.totalQty = getTotalQty(updatedCart.products)
      updatedCart.save()
      res.json(updatedCart)
    } else {
      //guest - for this do a method to extrapolate product data and push to items array
      const cart = new Cart(req.session.cart ? req.session.cart : {})
      cart.add(product, product.id)
      req.session.cart = cart
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

// cart/:productId - removes all of one item
//should be a PUT (confirm NOT a delete request), will be to remove a particular item in our cart, regardless of quantity
router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
      })
      const product = await Product.findByPk(req.params.productId)
      const promise = await userCart.removeProduct(product)
      console.log('promise returned from removeProduct magic method: ', promise)
      const updatedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product,
          },
        ],
      })
      console.log(
        'this product was removed:',
        product.title,
        'for user #',
        req.user.id
      )
      updatedCart.orderTotal = getOrderTotal(updatedCart.products)
      updatedCart.totalQty = getTotalQty(updatedCart.products)
      updatedCart.save()
      res.json(updatedCart)
    } else {
      const cart = new Cart(req.session.cart ? req.session.cart : {})
      cart.removeItem(req.params.productId)
      req.session.cart = cart
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

//removes qty of item by 1, or "desroys" assoc if only 1 in cart
router.put('/:productId/decrement', async (req, res, next) => {
  try {
    if (req.user) {
      //refactor to include aliased table - Noelle to link in team channel
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
      })
      const orderProduct = await OrderProduct.findOne({
        where: {orderId: userCart.id, productId: req.params.productId},
      })

      if (orderProduct.quantity > 1) {
        await orderProduct.update({
          quantity: orderProduct.quantity - 1,
        })
      } else {
        orderProduct.destroy() //or use magic method
      }

      const updatedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}],
      })
      updatedCart.orderTotal = getOrderTotal(updatedCart.products)
      updatedCart.totalQty = getTotalQty(updatedCart.products)
      updatedCart.save()
      res.json(updatedCart)
    } else if (req.session.cart.items[req.params.productId]) {
      const cart = new Cart(req.session.cart ? req.session.cart : {})
      cart.minusOne(req.params.productId)
      req.session.cart = cart
      res.json(cart)
    } else {
      res.send('this item is not in your cart')
    }
  } catch (err) {
    next(err)
  }
})

//****SUPERFLUOUS CART ROUTES*****

//see/GET order details for a specific item within a cart
// router.get('/:productId', async (req, res, next) => {
//   try {
//     if (req.user) {
//       const userCart = await Order.findOne({
//         where: {userId: req.user.id, isComplete: false},
//         include: [
//           {
//             model: Product,
//             where: {id: req.params.productId},
//           },
//         ],
//       })
//       res.json(userCart)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// cart/:productId/increment
//adds one to qty of item in cart
//INCREMENT PUT REQUEST - would we want to do a form?
// router.put('/:productId/increment', async (req, res, next) => {
//   try {
//     if (req.user) {
//       const userCart = await Order.findOne({
//         where: {userId: req.user.id, isComplete: false},
//       })
//       const orderProduct = await OrderProduct.findOne({
//         where: {orderId: userCart.id, productId: req.params.productId},
//       })
//       await orderProduct.update({
//         quantity: orderProduct.quantity + 1,
//       })
//       const updatedCart = await Order.findOne({
//         where: {userId: req.user.id, isComplete: false},
//         include: [{model: Product}],
//       })
//       res.json(updatedCart)
//     } else {
//       res.json('this user is a guest') //work on guest cart
//     }
//   } catch (err) {
//     next(err)
//   }
// })
