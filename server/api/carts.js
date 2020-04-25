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
      if (!req.session.cart) {
        req.session.cart = new Cart()
      }
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})
//should be a delete request
router.get('/delete', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false}
        // include: [
        //   {
        //     model: Product
        //   }
        // ]
      })

      // console.log('this cart was found:', userCart.id, 'for user #', req.user.id) // remember to remove!!
      const emptied = await userCart.removeProducts(
        await userCart.getProducts()
      )
      console.log('number of products removed is: ', emptied)
      const emptiedCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false}
        // include: [
        //   {
        //     model: Product
        //   }
        // ]
      })
      res.json(emptiedCart)
    } else {
      // guest

      res.send('this person is a guest')
    }
  } catch (error) {
    next(error)
  }
})

//should be a post to add to a logged in users cart
router.get('/:productId', async (req, res, next) => {
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
      //guest
      res.send('this person is a guest')
    }
  } catch (err) {
    next(err)
  }
})

//should be a delete request, will be to remove all of a particular item in our cart
router.get('/:productId/delete', async (req, res, next) => {
  try {
    if (req.user) {
      const userCart = await Order.findOne({
        where: {userId: req.user.id, isComplete: false},
        include: [
          {
            model: Product
          }
        ]
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
      //guest
      res.send('this person is a guest')
    }
  } catch (error) {
    next(error)
  }
})

//should be a put to manipulate the quantity of a product they already have in their cart
router.get('/:productId/put', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {userId: req.user.id, isComplete: false},
      include: [
        {
          model: Product
        }
      ]
    })
    const orderProduct = await OrderProduct.findOne({
      where: {orderId: userCart.id, productId: req.params.productId}
    })

    console.log(orderProduct)
    const updated = await orderProduct.update({
      quantity: orderProduct.quantity + 1
    })

    res.json(updated)
  } catch (err) {
    next(err)
  }
})
