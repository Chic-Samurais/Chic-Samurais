import React from 'react'
import {connect} from 'react-redux'

import {
  fetchCurrentOrder,
  increaseQuant,
  decreaseQuant,
  deleteProd
} from '../store/cart'
import UserCheckoutForm from './user-checkout'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCurrentOrder()
  }

  render() {
    const userCartProducts = this.props.userCart.products || []
    return (
      <div id="cart">
        {this.props.userCart.isComplete ? (
          <h2>🖼 Purchased Posters 🖼</h2>
        ) : (
          <h2>🖼 Prospective Posters for Purchase 🖼</h2>
        )}
        {userCartProducts.map(product => (
          <div key={product.id}>
            <img
              src={product.imageUrl}
              height="100px"
              width=""
              className="prodThumb"
            />
            <h3>{product.title}</h3>
            <p>Price: ${product.price / 100}.00</p>
            <p>Qty: {product.orderProduct.quantity}</p>
            <button
              type="button"
              onClick={() => this.props.increaseQuant(product)}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => this.props.decreaseQuant(product)}
            >
              -
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.deleteProd(product)
              }}
            >
              Remove Item
            </button>
            <br />
            <br />
            <br />
          </div>
        ))}
        <h3>
          Order Total: $
          {this.props.userCart.orderTotal ? this.props.userCart.orderTotal : 0}
          .00
        </h3>
        {this.props.userCart.totalQty ? (
          <h3>
            Total Items:
            {this.props.userCart.totalQty}
          </h3>
        ) : (
          <h3>
            Your cart is empty! Pick out some posters before peacin', please 🙏
          </h3>
        )}

        <hr />
        <UserCheckoutForm />
      </div>
    )
  }
}

//Insert name and address form for checkout
const mapState = state => {
  return {userCart: state.userCart.cart}
}

const mapDispatch = dispatch => ({
  fetchCurrentOrder: () => dispatch(fetchCurrentOrder()),
  increaseQuant: product => dispatch(increaseQuant(product)),
  decreaseQuant: product => dispatch(decreaseQuant(product)),
  deleteProd: product => dispatch(deleteProd(product))
})
export default connect(mapState, mapDispatch)(Cart)
