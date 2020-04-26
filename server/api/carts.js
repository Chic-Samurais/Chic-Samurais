const router = require('express').Router()
const {User, Order, Product, OrderProduct, Cart} = require('../db/models')
module.exports = router

//"VIEW CART" FOR LOGGED IN USERS OR GUESTS
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const [userCart, created] = await Order.findOrCreate({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product
          }
        ]
      })
      console.log('this cart was created:', created, 'for user #', req.user.id) // remember to remove!!
      res.json(userCart)
    } else {
      const cart = new Cart(req.session.cart ? req.session.cart : {})
      req.session.cart = cart
      console.log('is there a cart on session?', req.session.cart)
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

//GET ROUTE FOR A SPECIFIC ITEM WITHIN A CART, WOULD THIS BE NECESSARY FOR ANY REASON?
router.get('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product,
            where: {id: req.params.productId}
          }
        ]
      })
      res.json(userCart)
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
        where: {userId: req.user.id, isComplete: false}
      })
      // console.log('this cart was found:', userCart.id, 'for user #', req.user.id) // remember to remove!!
      const emptied = await userCart.removeProducts(
        await userCart.getProducts()
      )
      console.log('number of products removed is: ', emptied)
      const emptiedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product
          }
        ]
      })
      res.json(emptiedCart)
    } else {
      // guest, perhaps call a method on the cart? like req.session.cart.EMPTYCART();
      res.send('this person is a guest')
    }
  } catch (error) {
    next(error)
  }
})

//ADDING/POSTING A NEW, UNIQUE ITEM TO A CART
router.post('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const [userCart, created] = await Order.findOrCreate({
        where: {userId: req.user.id, isComplete: false}
      })
      const product = await Product.findByPk(req.params.productId)
      await userCart.addProduct(product)
      const updatedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product
          }
        ]
      })
      console.log(
        'this cart was created:',
        created,
        'for user #',
        req.user.id,
        'with this product:',
        product.title
      )
      res.json(updatedCart)
    } else {
      //guest - for this do a method to extrapolate product data and push to items array
      res.send('this person is a guest')
    }
  } catch (err) {
    next(err)
  }
})

//should be a PUT (confirm NOT a delete request), will be to remove a particular item in our cart, regardless of quantity
router.put('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false}
      })
      const product = await Product.findByPk(req.params.productId)
      const promise = await userCart.removeProduct(product)
      console.log('promise returned from removeProduct magic method: ', promise)
      const updatedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product
          }
        ]
      })
      console.log(
        'this product was removed:',
        product.title,
        'for user #',
        req.user.id
      )
      res.json(updatedCart)
    } else {
      //guest - splice on the cart.items array?
      res.send('this person is a guest')
    }
  } catch (error) {
    next(error)
  }
})

//INCREMENT PUT REQUEST - would we want to do a form?
router.put('/:productId/increment', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false}
      })
      const orderProduct = await OrderProduct.findOne({
        where: {orderId: userCart.id, productId: req.params.productId}
      })
      await orderProduct.update({
        quantity: orderProduct.quantity + 1
      })
      const updatedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}]
      })
      res.json(updatedCart)
    } else {
      res.json('this user is a guest') //work on guest cart
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId/decrement', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false}
      })
      const orderProduct = await OrderProduct.findOne({
        where: {orderId: userCart.id, productId: req.params.productId}
      })

      // check that the quantity is greater than 1, otherwise detroy the orderProduct association. Do we want this from a UX perspective?
      if (orderProduct.quantity > 1) {
        await orderProduct.update({
          quantity: orderProduct.quantity - 1
        })
      } else {
        orderProduct.destroy() //or use magic method
      }

      const updatedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [{model: Product}]
      })
      res.json(updatedCart)
    } else {
      res.json('this user is a guest') //work on guest cart
    }
  } catch (err) {
    next(err)
  }
})
