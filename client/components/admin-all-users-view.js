import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/adminUser'
import {Link} from 'react-router-dom'

export class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchAllUsers()
  }
  render() {
    console.log('this.props: ', this.props)
    const users = this.props.users || []
    console.log('this.props: ', this.props)
    return (
      <div id="allProducts">
        {users.map(user => (
          <div key={user.id} className="allProductMapped">
            <h3>User ID: {user.id}</h3>
            <h4>Email: {user.email}</h4>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {users: state.adminUser.allUsers}
}

const mapDispatch = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers())
})
export default connect(mapState, mapDispatch)(AllUsers)
