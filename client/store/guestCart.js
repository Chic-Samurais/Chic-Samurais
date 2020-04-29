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
const getCurrentOrder = cart => ({
  type: GET_CURRENT_ORDER,
  cart
})
const decreaseQty = cart => ({
  type: DECREASE_QTY,
  cart
})

const increaseQty = cart => ({
  type: INCREASE_QTY,
  cart
})
const deleteItem = cart => ({
  type: DELETE_ITEM,
  cart
})
const checkout = sessionId => ({
  type: CHECKOUT,
  sessionId
})

//INITIAL STATE

const initialState = {
  cart: {}
}

//THUNKS

export const fetchCurrentOrder = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart`)
    dispatch(getCurrentOrder(data))
    console.log('>>>>>>>data:', data)
  } catch (err) {
    console.error(err)
  }
}
export const increaseQuant = product => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${product.item.id}`)
    dispatch(increaseQty(data))
    console.log('>>>>>>>data: ', data)
  } catch (err) {
    console.error(err)
  }
}
export const decreaseQuant = product => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${product.item.id}/decrement`)
    dispatch(decreaseQty(data))
  } catch (err) {
    console.error(err)
  }
}
export const deleteProd = product => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${product.item.id}`)
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
      console.log(state)
      return {...state, cart: action.cart}

    case INCREASE_QTY:
      return {...state, cart: action.cart}

    case DECREASE_QTY:
      return {...state, cart: action.cart}

    case DELETE_ITEM:
      return {...state, cart: action.cart}
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
