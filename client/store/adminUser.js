import axios from 'axios'
import history from '../history'

//INITIAL STATE
const initialState = {
  allUsers: []
}

//ACTION CREATORS
const GET_ALL_USERS = 'GET_ALL_USERS'

//ACTION TYPES
const viewAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

//THUNK CREATOR

export const fetchAllUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(viewAllUsers(data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.users
      }
    default:
      return state
  }
}
