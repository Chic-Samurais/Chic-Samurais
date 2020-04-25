module.exports = class Cart {
  constructor() {
    this.items = []
    this.orderTotal = this.getTotal()
    this.numItems = this.items.length
  }

  getTotal() {
    let sum = 0
    this.items.forEach(item => {
      sum += item.price * item.orderProduct.quantity
    })
    return sum
  }
}
