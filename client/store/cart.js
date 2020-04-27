import axios from 'axios'
import history from '../history'
import {func} from 'prop-types'

//ACTION CREATORS
const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER'
const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'
const DELETE_ITEM = 'DELETE_ITEM'
const CHECKOUT = 'CHECKOUT'

//ACTION TYPES
const getCurrentOrder = userId => ({
  type: GET_CURRENT_ORDER,
  userId
})
const decreaseQty = productId => ({
  type: DECREASE_QTY,
  productId
})

const increaseQty = productId => ({
  type: INCREASE_QTY,
  productId
})
const deleteItem = productId => ({
  type: DELETE_ITEM,
  productId
})
const checkout = userId => ({
  type: CHECKOUT,
  userId
})

//INITIAL STATE

const initialState = {
  cart: [],
  user: {},
  singleProduct: {}
}

//THUNKS

export const fetchCurrentOrder = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart`)
    dispatch(getCurrentOrder(data.products))
  } catch (err) {
    console.error(err)
  }
}
export const increaseQuant = productId => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${productId}`)
    dispatch(increaseQty(data))
  } catch (err) {
    console.error(err)
  }
}
export const decreaseQuant = productId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${productId}/decrement`)
    dispatch(decreaseQty(data))
  } catch (err) {
    console.error(err)
  }
}
export const deleteProd = productId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${productId}`)
    dispatch(deleteItem(data))
  } catch (err) {
    console.error(err)
  }
}
export const checkoutCart = () => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/checkout`)
    dispatch(checkout(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return {...state, cart: action.id}

    case INCREASE_QTY:
      return {...state, singleProduct: action.productId}

    case DECREASE_QTY:
      return {...state, singleProduct: action.productId}

    case DELETE_ITEM:
      return {
        cart: state.cart.filter(product => product.id !== action.id)
      }
    case CHECKOUT:
      console.log(state)
      return {...state}
    // where orders.userId = action.userId > order.isComplete = true
    //  (cart.id === action.id ) {
    //     return cart.isComplete = true
    //  }
    default:
      return state
  }
}
