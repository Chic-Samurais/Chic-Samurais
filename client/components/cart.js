import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCurrentOrder} from '../store/cart'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCurrentOrder()
    console.log('state is: ', this.state)
  }
  render() {
    const cart = this.props.cart || []
    console.log('mad props yo', this.props)
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
  fetchCurrentOrder: () => dispatch(fetchCurrentOrder())
})
export default connect(mapState, mapDispatch)(Cart)
