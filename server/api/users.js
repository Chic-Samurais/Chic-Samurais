const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

//USER INFORMATION - check if we should be using MIDDLEWARE for security
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
