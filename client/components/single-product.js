import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/product'
import {Link} from 'react-router-dom'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    console.log(this.props, 'compenantdid mount')
    const id = this.props.match.params.productId
    this.props.fetchSingleProduct(id)
  }
  render() {
    console.log('SINGLE PRODUCT RENDER')
    console.log('--------------')
    console.log('PROPS', this.props)
    console.log('STATE', this.state)
    const product = this.props.product || {}
    return (
      <div id="singleProduct">
        <h2>{product.title}</h2>
        <p>{product.artist}</p>
        <img src={product.imageUrl} />
        <p>
          {product.price} <button type="submit">Add to Cart</button>
        </p>
        <p>{product.desciption}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {...state, singleProduct: state.product.singleProduct}
}
const mapDispatch = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
