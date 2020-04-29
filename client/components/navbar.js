import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 className="siteHeader"> 🎨 Artsy Posters 🎨</h1>
    <h3 className="siteHeader"> ~ Cover Your Walls in Culture ~ </h3>
    <nav>
      {isLoggedIn ? (
        <div className="navDiv">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home 🏠</Link>
          <a href="#" onClick={handleClick}>
            Logout 👋
          </a>
          <Link to="/products">Peruse our Products 🧐</Link>
          <Link to="/cart">View Cart 🛒</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Peruse our Products 🧐</Link>
          <Link to="/guestCart">View Cart 🛒</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
  // isAdmin: PropTypes.bool.isRequired
}
