import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <div>
      {isAuthenticated ? (
        <Redirect to='/dashboard' />
      ) : (
          <div>
            <Route component={Component} {...rest} />
          </div>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.id
})
export default connect(mapStateToProps)(PublicRoute);
