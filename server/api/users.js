const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
module.exports = router

//LOGGED IN USER CARTS
router.get('/cart', async (req, res, next) => {
  try {
    const [userCart, created] = await Order.findOrCreate({
      where: {userId: req.session.passport.user, isComplete: false},
      include: [
        {
          model: Product
        }
      ]
    })
    console.log('this cart was created:', created) // remember to remove!!
    console.log(req.session.passport.user) //remember to remove!!
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

//DO WE NEED THIS??
router.get('/cart/:productId', async (req, res, next) => {
  try {
    const [userCart, created] = await Order.findOrCreate({
      where: {userId: req.session.passport.user, isComplete: false},
      include: [
        {
          model: Product,
          where: {id: req.params.productId}
        }
      ]
    })
    console.log('this cart was created:', created) // remember to remove!!
    console.log(req.session.passport.user) //remember to remove!!
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

router.post('/cart/:productId', async (req, res, next) => {
  try {
    const [userCart, created] = await Order.findOrCreate({
      where: {userId: req.session.passport.user, isComplete: false},
      include: [
        {
          model: Product
        }
      ]
    })

    if (
      !userCart.products.filter(product => product.id === req.body.id).length
    ) {
      userCart.addProduct(req.body)
    }
    console.log('this cart was created:', created) // remember to remove!!
    console.log(req.session.passport.user) //remember to remove!!
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

//USER INFORMATION
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
      //For code review: do we want to exclude passwords to admins too if we're planning on protecting this route?
    })
    res.json(users)
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
          // through: {
          // attributes: ['id', 'email'],
          // },
        }
      ]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST ROUTES FOR USERS IN AUTH
// router.post('/', async (req, res, next) => {
//   try {
//     const newUser = await User.create(req.body) //destructure off of here??
//     res.json(newUser) // res.redirecct?? what do we want rendered here/sent to redux store???
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const updated = await user.update(req.body) // hide/destructure somehow?
    res.json(updated) // what do we want sent? possibility of redirect?
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const [userCart, created] = await Order.findOrCreate({
      where: {userId: req.params.userId, isComplete: false},
      include: [
        {
          model: Product
        }
      ]
    })
    console.log('this cart was created:', created)
    console.log(req.session.passport.user)
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const [userCart, created] = await Order.findOrCreate({
      where: {userId: req.params.userId, isComplete: false},
      include: [
        {
          model: Product
        }
      ]
    })
    console.log('this cart was created:', created)
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})
