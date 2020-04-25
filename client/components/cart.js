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
    console.log('Comp Did Mount - this.props.match.params', this.props.params)
    this.props.fetchCurrentOrder(this.props.params)
  }
  render() {
    // const cart = this.state.cart || []
    // const user = this.state.user || {}
    // console.log('RENDER - cart', cart)
    // console.log('RENDER-- USER', user)
    console.log('P A R A M S', this.params)
    console.log('mad props yo', this.props)
    return (
      <div id="cart">
        <h2>Welcome to your cart</h2>
        {
          // cart.map(product =>(
          //   <div key={product.id}>
          //     <img
          //     src={product.imageUrl}
          //     height="100px" width=""
          //     className="prodThumb"
          //     />
          //     <h3>{product.title}</h3>
          //      {/* <p>{product.quantity}</p> */}
          //   </div>
          // ))
        }
      </div>
    )
  }
}
const mapState = state => {
  return {...state}
}

const mapDispatch = dispatch => ({
  fetchCurrentOrder: () => dispatch(fetchCurrentOrder())
})
export default connect(mapState, mapDispatch)(Cart)
