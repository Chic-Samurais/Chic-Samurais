import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editProduct} from '../store/product'

export class EditProductForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      artist: '',
      price: 0,
      imageUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const formData = {
      title: this.state.title,
      artist: this.state.artist,
      price: this.state.price,
      imageUrl: this.state.imageUrl
    }
    this.props.editProduct(this.props.id, formData)
    console.log('edit product form props are: ', this.props)
    this.setState({
      title: '',
      artist: '',
      price: 0,
      imageUrl: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Edit Poster</h3>
        <label>
          Poster Title:
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            name="artist"
            onChange={this.handleChange}
            value={this.state.artist}
          />
        </label>
        <label>
          Price:
          <input
            type="integer"
            name="price"
            onChange={this.handleChange}
            value={this.state.price}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
        </label>
        <button type="submit">Edit Poster</button>
      </form>
    )
  }
}

const mapState = state => {
  return {product: state.product}
}
const mapDispatch = dispatch => ({
  editProduct: (id, formData) => dispatch(editProduct(id, formData))
})

export default connect(mapState, mapDispatch)(EditProductForm)
