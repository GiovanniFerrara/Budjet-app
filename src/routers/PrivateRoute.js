import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Header />
          <Route component={Component} {...rest} />
        </div>
      ) : (
          <Redirect to='/' />
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.id
})
export default connect(mapStateToProps)(PrivateRoute);