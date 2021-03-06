import axios from 'axios'
import history from '../history'
import {func} from 'prop-types'

/**
 * ACTION CREATORS
 */
const GET_PRODUCTS = 'GET_PRODUCTS' //getting all products
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

/**
 * ACTION TYPES
 */
const getProducts = retrievedProducts => ({
  type: GET_PRODUCTS,
  retrievedProducts
})
const getSingleProduct = id => ({type: GET_SINGLE_PRODUCT, id})

const updateProduct = product => ({type: UPDATE_PRODUCT, product})
const createProduct = product => ({type: CREATE_PRODUCT, product})
const removeProduct = id => ({type: REMOVE_PRODUCT, id})

/**
 * INITIAL STATE
 */
const initialProductState = {
  allProducts: [],
  singleProduct: {}
}

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export const postNewProduct = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', product)
    const action = createProduct(data)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    const action = removeProduct(id)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

export const editProduct = (id, formData) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, formData)
    const action = updateProduct(data)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

//REDUCER
export default function productReducer(state = initialProductState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.retrievedProducts
      }
    case GET_SINGLE_PRODUCT:
      return action.id

    case CREATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.product]
      }

    case REMOVE_PRODUCT:
      return {
        allProducts: state.allProducts.filter(
          product => product.id !== action.id
        )
      }

    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}
