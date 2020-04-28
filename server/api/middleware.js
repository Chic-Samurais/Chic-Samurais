const express = require('express')
module.exports = function isAdmin(req, res, next) {
if(req.user.isAdmin) {
  next()
} else {
  res.redirect('/products')
}
}
