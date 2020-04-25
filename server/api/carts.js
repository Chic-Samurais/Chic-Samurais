const router = require('express').Router()
const {User, Order, Product, OrderProduct} = require('../db/models')
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
      // guest

      res.send('this person is a guest')
    }
  } catch (err) {
    next(err)
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
