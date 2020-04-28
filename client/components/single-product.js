import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/product'
import {Link} from 'react-router-dom'
import {increaseQuant} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    //   // this.handleChange = this.handleChange.bind(this)
    //   // this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }
  render() {
    const product = this.props.product || {}

    return (
      <div id="singleProduct">
        <h2>{product.title}</h2>
        <p>{product.artist}</p>
        <img src={product.imageUrl} />
        <p>${product.price / 100}</p>
        <p>{product.desciption}</p>
        <button type="button" onClick={() => this.props.increaseQuant(product)}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {product: state.product}
}
const mapDispatch = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
  increaseQuant: productId => dispatch(increaseQuant(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
