import React, { Component } from 'react';
import authProvider from '../firebase/firebase';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth'

export const LoginPage = ({ login }) => {
  return (
    <div className="box-layout" >
      <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify</h1>
        <p>It's time to get your expenses under control.</p>
        <button className="button" onClick={login}>Login with Google</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)