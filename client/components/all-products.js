import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {increaseQuant} from '../store/cart'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const products = this.props.products || []
    return (
      <div id="allProducts">
        {products.map(product => (
          <div key={product.id} className="allProductMapped">
            <Link to={`products/${product.id}`}>
              <img
                src={product.imageUrl}
                className="allProductImg"
                height="250px"
                width=""
              />
              <h3>{product.title}</h3>
              <h4>{product.artist}</h4>
              <p>${product.price / 100}</p>
            </Link>
            <button
              type="button"
              onClick={() => this.props.increaseQuant(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.product.allProducts}
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  increaseQuant: product => dispatch(increaseQuant(product))
})
export default connect(mapState, mapDispatch)(AllProducts)
