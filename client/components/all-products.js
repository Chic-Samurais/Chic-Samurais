import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
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
  fetchProducts: () => dispatch(fetchProducts())
})
export default connect(mapState, mapDispatch)(AllProducts)
