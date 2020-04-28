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
    console.log('>>>>>>>>>this.props.cart: ', this.props.guestCart)
    const guestCartItems = this.props.guestCart || []
    console.log(">>>>>>>>>guestCartItems: ", guestCartItems);
    return (
      <div id="cart">
        <h2>Welcome to your cart</h2>
        {Object.values(guestCartItems).map(item => (
          <div key={item.id}>
            {console.log(item.id)}
            <img
              src={item.imageUrl}
              height="100px"
              width=""
              className="prodThumb"
            />
            <h3>{item.title}</h3>
            <p>Subtotal: ${item.price / 100}</p>
            <p>Qty: {item.qty}</p>
            <button
              type="button"
              onClick={() => this.props.increaseQuant(item)}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => this.props.decreaseQuant(item)}
            >
              -
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.deleteProd(item)
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
  return {cart: state.guestCart.guestCart}
}

const mapDispatch = dispatch => ({
  fetchCurrentOrder: () => dispatch(fetchCurrentOrder()),
  increaseQuant: productId => dispatch(increaseQuant(productId)),
  decreaseQuant: productId => dispatch(decreaseQuant(productId)),
  deleteProd: productId => dispatch(deleteProd(productId))
})
export default connect(mapState, mapDispatch)(GuestCart)
