const User = require('./user')
const Artwork = require('./artwork')
const ArtworkOrder = require('./artworkOrder')
const Order = require('./order')

Artwork.belongsToMany(Order, {through: ArtworkOrder})
Order.belongsToMany(Artwork, {through: ArtworkOrder})

Order.belongsTo(User)
User.hasMany(Order)
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Artwork,
  ArtworkOrder,
  Order
}
