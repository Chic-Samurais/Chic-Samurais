const router = require('express').Router()
const {Product} = require('../db/models')
// const {Op} = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log(req.user)
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//ADMIN  ROUTES
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct) // res.redirecct?? what do we want rendered here/sent to redux store???
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    const updated = await product.update(req.body)
    res.json(updated) // what do we want sent? possibility of redirect?
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//GET ROUTES FOR ADMIN ALL
// router.get('/', async (req, res, next) => {
//   try {
//     const product = await Product.findAll({
//       where: {
//         quantity: {
//           [Op.gt]: 0,
//         },
//       },
//     })
//     res.json(product)
//   } catch (err) {
//     next(err)
//   }
// })
