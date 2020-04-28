import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct, postNewProduct} from '../store/product'
import {Link} from 'react-router-dom'
import AddProductForm from './add-product-form'

export class AdminProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  handleDelete(id) {
    this.props.deleteProduct(id)
  }

  handleEdit(id) {
    this.props.editProduct(id)
  }

  render() {
    const products = this.props.products || []
    return (
      <div id="allProducts">
        {products.map(product => (
          <div key={product.id} className="allProductMapped">
            <Link to={`/admin/products/${product.id}`}>
              <img
                src={product.imageUrl}
                className="allProductImg"
                height="250px"
                width=""
              />
              <h3>{product.title}</h3>
              <h4>{product.artist}</h4>
              <p>${product.price / 100} </p>
            </Link>
            <p>
              <button
                type="submit"
                onClick={() => this.props.deleteProduct(product.id)}
              >
                Delete Product
              </button>{' '}
            </p>
          </div>
        ))}
        <AddProductForm postNewProduct={this.props.postNewProduct} />
      </div>
    )
  }
}

const mapState = state => {
  return {products: state.product.allProducts}
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  postNewProduct: product => dispatch(postNewProduct(product)),
  deleteProduct: id => dispatch(deleteProduct(id))
})
export default connect(mapState, mapDispatch)(AdminProducts)
