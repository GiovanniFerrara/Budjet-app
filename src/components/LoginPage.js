import React, { Component } from 'react';
import authProvider from '../firebase/firebase';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth'

export class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.props.login} >Login</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)