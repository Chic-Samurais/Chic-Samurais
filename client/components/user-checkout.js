import React from 'react'
import {connect} from 'react-redux'
import {checkoutCart} from '../store/cart'

export class UserCheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.checkoutCart(this.state)
  }

  render() {
    if (this.props.cart.isComplete) {
      return (
        <h3>
          Thank you! Your order has been submitted and your walls will be
          decorated extraordinarily, momentarily...
        </h3>
      )
    }
    return (
      <div id="checkout">
        <form
          onSubmit={() => {
            this.handleSubmit(event)
          }}
        >
          Name:
          <br />
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            value={this.state.value}
            name="name"
          />
          <br />
          <br />
          Address:
          <br />
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            value={this.state.value}
            name="address"
          />
          <br />
          <br />
          <button type="submit">Order that Oeuvre</button>
        </form>
        <br />
        <sup>
          <i>
            *An oeuvre is the very fancy French way of referring to a piece of
            art. Just some light pretention to go with your new possession(s)!
          </i>
        </sup>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.userCart.cart
  }
}

const mapDispatch = dispatch => ({
  checkoutCart: shippingInfo => dispatch(checkoutCart(shippingInfo))
})
export default connect(mapState, mapDispatch)(UserCheckoutForm)
