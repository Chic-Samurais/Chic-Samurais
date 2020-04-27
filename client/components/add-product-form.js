import React, {Component} from 'react'

export default class AddProductForm extends Component {
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
    const newPoster = {
      title: this.state.title,
      artist: this.state.artist,
      price: this.state.price,
      imageUrl: this.state.imageUrl
    }
    this.props.postNewProduct(newPoster)
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
        <h3>Add Poster</h3>
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
        <button type="submit">Add New Poster</button>
      </form>
    )
  }
}
