const router = require('express').Router()
module.exports = router

router.use('/products', require('./products'))
router.use('/users', require('./users'))
// router.use('/orders', require('./orders'))
//add a productOrder route???

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
