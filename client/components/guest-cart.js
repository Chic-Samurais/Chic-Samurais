import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCurrentOrder,
  increaseQuant,
  decreaseQuant,
  deleteProd
} from '../store/guestCart'

export class GuestCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCurrentOrder()
  }

  render() {
    // console.log('>>>>>>props: ', this.props);
    const cart = this.props.cart || []
    // console.log('>>>>>>>>>this.props.cart: ', this.props.cart)
    return (
      <div id="cart">
        <h2>Welcome to your cart</h2>
        {cart.map(product => (
          <div key={product.item.id}>
            <img
              src={product.item.imageUrl}
              height="100px"
              width=""
              className="prodThumb"
            />
            <h3>{product.item.title}</h3>
            <p>Price: ${product.price / 100}</p>
            <p>Qty: {product.qty}</p>
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
        <div />
      </div>
    )
  }
}

//Insert name and address form for checkout
const mapState = state => {
  return {cart: state.guestCart.cart}
}

const mapDispatch = dispatch => ({
  fetchCurrentOrder: () => dispatch(fetchCurrentOrder()),
  increaseQuant: productId => dispatch(increaseQuant(productId)),
  decreaseQuant: productId => dispatch(decreaseQuant(productId)),
  deleteProd: productId => dispatch(deleteProd(productId))
})
export default connect(mapState, mapDispatch)(GuestCart)
