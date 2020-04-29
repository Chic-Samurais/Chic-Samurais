import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div>
      {isAdmin ? (
        <div>
          <h3>Welcome, {email}! </h3>
          <h4>
            <em>
              Thank you for helping to make this site as beautiful as one of our
              many *mock* masterpieces!
            </em>
          </h4>
          <Link to="/admin/products">Edit Products</Link>
          <br />
          <br />
          <Link to="/admin/users">View Users</Link>
        </div>
      ) : (
        <div>
          <h3>Welcome back, {email}!</h3>
          <h4>
            <i>
              May your shopping experience be as fine as the art in our
              inventory . . .
            </i>
          </h4>
          <br />
          <h3>🖼 Previously Procured Posters 🖼</h3>
        </div>
      )}
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
