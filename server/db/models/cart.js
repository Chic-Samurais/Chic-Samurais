//items array will have objects with a product id, quantity, and price
//this.items = [{productId: 1, quantity: 2, price: 7500}]
//in the future, reduce to find total # of items in cart

module.exports = class Cart {
  constructor(oldCart) {
    this.items = oldCart.items || {}
    this.totalQty = oldCart.totalQty || 0
    this.totalPrice = oldCart.totalPrice || 0
  }
  add(item, id) {
    let storedItem = this.items[id]
    if (!storedItem) {
      storedItem = this.items[id] = {item: item, qty: 0, price: 0}
    }
    storedItem.qty++
    storedItem.price = storedItem.item.price * storedItem.qty
    this.totalQty++
    this.totalPrice += storedItem.item.price
    // let sum = 0
    // this.items.forEach(item => {
    //   sum += item.price * item.quantity
    // })
    // return sum
  }

  removeItem(id) {
    this.totalQty -= this.items[id].qty
    this.totalPrice -= this.items[id].price
    delete this.items[id] //do we want to use delete here?
  }

  minusOne(id) {
    this.items[id].qty--
    this.items[id].price -= this.items[id].item.price
    this.totalQty--
    this.totalPrice -= this.items[id].item.price
    if (this.items[id].qty <= 0) {
      this.removeItem(id)
    }
  }

  clearCart() {
    this.items = {}
    this.totalQty = 0
    this.totalPrice = 0
  }

  generateArray() {
    return Object.values(this.items)
  }
}
