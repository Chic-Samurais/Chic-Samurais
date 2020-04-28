const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

//LOGGED IN USER CARTS
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const [userCart, created] = await Order.findOrCreate({
      where: {userId: userId, isComplete: false},
      include: [
        {
          model: Product
        }
      ]
    })
    console.log('/userId/cart --- CALLED!')
    console.log('this cart was created:', created) // remember to remove!!
    console.log(req.session.passport.user) //remember to remove!!
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

// router.get('/cart/:productId', async (req, res, next) => {
//   try {
//     const [userCart, created] = await Order.findOrCreate({
//       where: {userId: req.session.passport.user, isComplete: false},
//       include: [
//         {
//           model: Product
//         }
//       ]
//     })

//     const product = await Product.findByPk(req.params.productId)

//     if (
//       !userCart.products.filter(prod => {
//         return prod.id === req.params.productId
//       }).length
//     ) {
//       console.log(
//         userCart.products.find(prod => prod.id === req.params.productId)
//       )
//       await userCart.addProduct(product)
//     } else {
//       const orderProduct = await OrderProduct.findOne({
//         where: {orderId: userCart.id, productId: req.params.productId}
//       })
//       const updatedProduct = orderProduct.update({
//         quantity: orderProduct.quantity + 1
//       })
//       console.log(updatedProduct.quantity)
//     }
//     // console.log('this cart was created:', created) // remember to remove!!
//     // console.log(req.session.passport.user)
//     // console.log('added product', product, 'created:', created)
//     //remember to remove!!
//     res.json(userCart)
//   } catch (err) {
//     next(err)
//   }
// })

//USER INFORMATION
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though users' passwords are encrypted, it won't help if we just send everything to anyone who asks!
      attributes: ['id', 'email']
      //For code review: do we want to exclude passwords to admins too if we're planning on protecting this route?
    })
    if (req.user && req.user.isAdmin) {
      res.json(users)
    } else {
      res.sendStatus(403) // is this correct or should we change this to middleware/redirect?
    }
  } catch (err) {
    next(err)
  }
})

//do we want users to have access to their single route and if so, how do we protect it (using sessions?) and is there anything we should exclude?
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Order
        }
      ]
    })

    if (
      req.user &&
      (req.user.id === Number(req.params.userId) || req.user.isAdmin)
    ) {
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// POST ROUTES FOR USERS - DO WE NEED TO IF USERS SIGN THEMSELVES UP?

//WE NEED A USER FORM COMPONENT ON THE FRONT END FOR USER EDITS/UPDATES - how should we handle that? is that tier 1?
router.put('/:userId', async (req, res, next) => {
  try {
    if (
      req.user &&
      (req.user.id === Number(req.params.userId) || req.user.isAdmin)
    ) {
      const user = await User.findByPk(req.params.userId)
      const updated = await user.update(req.body) // hide/destructure somehow?
      res.json(updated) // what do we want sent? possibility of redirect?
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    if (
      req.user &&
      (req.user.id === Number(req.params.userId) || req.user.isAdmin)
    ) {
      const user = await User.findByPk(req.params.userId)
      await user.destroy()
      res.sendStatus(403)
    } else {
      res.send('Forbidden')
    }
  } catch (err) {
    next(err)
  }
})
