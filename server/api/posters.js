const router = require('express').Router()
const {Poster} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const posters = await Poster.findAll()
    res.json(posters)
  } catch (err) {
    next(err)
  }
})

router.get('/:posterId', async (req, res, next) => {
  try {
    const poster = await Poster.findByPk(req.params.posterId)
    res.json(poster)
  } catch (err) {
    next(err)
  }
})

//post, put, and delete as admin????
