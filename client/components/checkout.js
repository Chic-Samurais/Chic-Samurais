import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {checkoutCart} from '../store/cart'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    return (
      <div id="checkout">
        <form onSubmit={this.handleSubmit(event)}>
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            value={this.state.value}
            name="name"
          />
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            value={this.state.value}
            name="address"
          />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {cart: state.cart.cart}
}

const mapDispatch = dispatch => ({
  checkoutCart: () => dispatch(checkoutCart())
})
export default connect(mapState, mapDispatch)(Cart)
