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
const getCurrentOrder = products => ({
  type: GET_CURRENT_ORDER,
  products
})
const decreaseQty = products => ({
  type: DECREASE_QTY,
  products
})

const increaseQty = products => ({
  type: INCREASE_QTY,
  products
})
const deleteItem = products => ({
  type: DELETE_ITEM,
  products
})
const checkout = orderInfo => ({
  type: CHECKOUT,
  orderInfo
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
    console.log('>>>>>>>data: ', data)
  } catch (err) {
    console.error(err)
  }
}
export const increaseQuant = product => async dispatch => {
  const productId = product.id
  try {
    const {data} = await axios.put(`/api/cart/${productId}`)
    dispatch(increaseQty(data.products))
  } catch (err) {
    console.error(err)
  }
}
export const decreaseQuant = product => async dispatch => {
  const productId = product.id
  try {
    const {data} = await axios.put(`/api/cart/${productId}/decrement`)
    dispatch(decreaseQty(data.products))
  } catch (err) {
    console.error(err)
  }
}
export const deleteProd = product => async dispatch => {
  try {
    const productId = product.id
    const {data} = await axios.delete(`/api/cart/${productId}`)
    dispatch(deleteItem(data.products))
  } catch (err) {
    console.error(err)
  }
}
export const checkoutCart = orderInfo => async dispatch => {
  try {
    const {data} = await axios.put(`/api/checkout`, orderInfo)
    dispatch(checkout(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return {...state, cart: action.products}

    case INCREASE_QTY:
      return {...state, cart: action.products}

    case DECREASE_QTY:
      return {...state, cart: action.products}

    case DELETE_ITEM:
      return {...state, cart: action.products}
    case CHECKOUT:
      console.log('Checking Out! reducer')
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
