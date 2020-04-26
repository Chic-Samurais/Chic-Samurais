import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, editProduct} from '../store/product'
import {Link} from 'react-router-dom'
import EditProductForm from './edit-product-form'

export class AdminSingleProduct extends React.Component {
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
        <p>
          ${product.price / 100} <button type="submit">Add to Cart</button>
        </p>
        <p>{product.desciption}</p>
        <EditProductForm editProduct={this.props.editProduct} />
      </div>
    )
  }
}

const mapState = state => {
  return {product: state.product}
}
const mapDispatch = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
  editProduct: id => dispatch(editProduct(id))
})

export default connect(mapState, mapDispatch)(AdminSingleProduct)
