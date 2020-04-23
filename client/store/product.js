import axios from 'axios'
import history from '../history'
import {func} from 'prop-types'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS' //getting all products
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

/**
 * ACTION CREATORS
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
  products: [],
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

export default function productReducer(state = initialProductState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.retrievedProducts
      }
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.id
      }
    default:
      return state
  }
}
