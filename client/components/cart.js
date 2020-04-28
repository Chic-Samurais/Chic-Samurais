import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCurrentOrder,
  increaseQuant,
  decreaseQuant,
  deleteProd
} from '../store/cart'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCurrentOrder()
  }

  render() {
    const cart = this.props.cart || []
    return (
      <div id="cart">
        <h2>Welcome to your cart</h2>
        {cart.map(product => (
          <div key={product.id}>
            <img
              src={product.imageUrl}
              height="100px"
              width=""
              className="prodThumb"
            />
            <h3>{product.title}</h3>
            <p>Price: ${product.price / 100}</p>
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
                // .setState(this.props.fetchCurrentOrder())
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )
  }
}

//Insert name and address form for checkout
const mapState = state => {
  return {cart: state.cart.cart}
}

const mapDispatch = dispatch => ({
  fetchCurrentOrder: () => dispatch(fetchCurrentOrder()),
  increaseQuant: productId => dispatch(increaseQuant(productId)),
  decreaseQuant: productId => dispatch(decreaseQuant(productId)),
  deleteProd: productId => dispatch(deleteProd(productId))
})
export default connect(mapState, mapDispatch)(Cart)
