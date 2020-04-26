//items array will have objects with a product id, quantity, and price
//this.items = [{productId: 1, quantity: 2, price: 7500}]
//in the future, reduce to find total # of items in cart

module.exports = class Cart {
  constructor() {
    this.items = []
    this.orderTotal = this.getTotal()
  }

  getTotal() {
    let sum = 0
    this.items.forEach(item => {
      sum += item.price * item.quantity
    })
    return sum
  }
}
