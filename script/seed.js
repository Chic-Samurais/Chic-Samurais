'use strict'

const db = require('../server/db')
const {User, Order, Product, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      isAdmin: true,
      // firstName: 'Jane',
      // lastName: 'Doe',
      email: 'email@email.com',
      password: '1234'
      // address: '123 Main Street'
    }),
    User.create({
      // isAdmin: true,
      // firstName: 'John',
      // lastName: 'Smith',
      email: 'email1@email.com',
      password: '1234'
      // address: '234 Main Street'
    }),
    User.create({
      email: 'email2@email.com',
      password: '1234'
    }),
    User.create({
      email: 'email3@email.com',
      password: '1234'
    }),
    User.create({
      email: 'email4@email.com',
      password: '1234'
    }),
    User.create({
      email: 'email5@email.com',
      password: '1234'
    })
  ])

  const products = await Promise.all([
    Product.create({
      artist: 'Vincent van Gogh',
      title: 'The Starry Night',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
    }),
    Product.create({
      artist: 'Vincent van Gogh',
      title: 'The Night Cafe',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://www.vincentvangogh.org/images/paintings/the-night-cafe.jpg'
    }),
    Product.create({
      artist: 'Vincent van Gogh',
      title: 'Irises',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl: 'https://media.getty.edu/museum/images/web/enlarge/00094701.jpg'
    }),
    Product.create({
      artist: 'Vincent van Gogh',
      title: 'Bedroom in Arles',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl: 'https://www.vangoghgallery.com/painting/img/bedroom_full.jpeg'
    }),
    Product.create({
      artist: 'Carrie Mae Weems',
      title: 'Kitchen Table Series (Mother & Daughter)',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://i0.wp.com/www.guggenheim.org/wp-content/uploads/2014/01/CMW_MotherDaughter_1024.jpg?w=870&zoom=2'
    }),
    Product.create({
      artist: 'Helen Frankenthaler',
      title: 'Interior Landscape',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://uploads4.wikiart.org/images/helen-frankenthaler/interior-landscape-1964.jpg'
    }),
    Product.create({
      artist: 'Helen Frankenthaler',
      title: 'Saturn Revisited',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://uploads2.wikiart.org/images/helen-frankenthaler/saturn-revisited-1964.jpg'
    }),
    Product.create({
      artist: 'Helen Frankenthaler',
      title: 'What Red Lines Can Do',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://uploads7.wikiart.org/images/helen-frankenthaler/what-red-lines-can-do-1970.jpg'
    }),
    Product.create({
      artist: 'Helen Frankenthaler',
      title: 'Dream Walk',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://uploads5.wikiart.org/images/helen-frankenthaler/dream-walk-1977.jpg'
    }),
    Product.create({
      artist: 'Mickalene Thomas',
      title: 'Din, une très belles négresse #2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://d1lfxha3ugu3d4.cloudfront.net/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2012_Mickalene_Thomas_Sig-Image_EL110_428W.jpg'
    }),
    Product.create({
      artist: 'Mickalene Thomas',
      title: 'Interior: Two Chairs and a Fireplace',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://www.brooklynmuseum.org/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2012_Mickalene_Thomas_EL110.060_Interior-Two-Chairs-and-Fireplace_428H.jpg'
    }),
    Product.create({
      artist: 'Mickalene Thomas',
      title: 'Qusuquzah, une très belles négresse #2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://www.brooklynmuseum.org/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2012_Mickalene_Thomas_EL110.066_Qusuquzah-Une-Tres-Belle-Negresse-2_428H.jpg'
    }),
    Product.create({
      artist: 'Mickalene Thomas',
      title: 'Interior: Green and White Couch',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://www.brooklynmuseum.org/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2012_Mickalene_Thomas_EL110.059_Interior.-Green-and-White-Couch_428H.jpg'
    }),
    Product.create({
      artist: 'Mickalene Thomas',
      title: 'Landscape with Tree',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta mi et purus aliquet molestie. Aenean sed varius orci. Donec blandit efficitur nulla varius suscipit. Aliquam non sapien eu ante iaculis maximus pharetra non nisi.',
      price: 7500,
      quantity: 50,
      imageUrl:
        'https://www.brooklynmuseum.org/assets/system-images/remote/https_d1lfxha3ugu3d4.cloudfront.net/exhibitions/images/2012_Mickalene_Thomas_EL110.063_Landscape-With-Tree_428H.jpg'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1
    }),
    Order.create({
      userId: 2
    }),
    Order.create({
      userId: 3
    }),
    Order.create({
      userId: 4
    })
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({
      orderId: 1,
      productId: 3,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 5,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 4,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 3,
      productId: 5,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 3,
      productId: 8,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 3,
      productId: 2,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 4,
      productId: 13,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 4,
      productId: 3,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 4,
      productId: 7,
      price: 6500
    }),
    OrderProduct.create({
      orderId: 4,
      productId: 2,
      price: 6500
    })
  ])

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  // console.log(`seeded ${orders.length} orders`)
  // console.log(`seeded ${orderProducts.length} orderProducts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
