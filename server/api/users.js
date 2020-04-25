const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

// const adminsOnly = function(req, res, next) {
//     if (!req.user || !req.user.isAdmin) {
//       res.redirect('/')
//     } else {
//       next()
//     }
// }

router.get('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.redirect('/')
    }
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
    if (!req.user || !req.user.isAdmin) {
      res.redirect('/')
    }
    const user = await User.findByPk(req.params.userId)
    await user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
