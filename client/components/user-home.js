import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, isAdmin} = props

  return (
    <div>
    {isAdmin ? (
    <div>
      <h3>Welcome, {email}</h3>
      <Link to="/admin/products">Edit Products</Link>
      <br />
      <Link to="/admin/users">View Users</Link>
    </div>
    ) : (
      <div>
      <h3>Welcome, {email}</h3>
    </div>
    )
  }
  </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
