import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
        <h2>Prospective Posters for Purchase</h2>
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
          </div>
        ))}
        <h3>
          Order Total: $
          {this.props.userCart.orderTotal ? this.props.userCart.orderTotal : 0}
          .00
        </h3>
        <h4>
          Total Items:{' '}
          {this.props.userCart.totalQty ? this.props.userCart.totalQty : 0}
        </h4>
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
