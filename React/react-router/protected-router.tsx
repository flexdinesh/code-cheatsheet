// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';

// this is a very old approach - might need to figure out a modern way
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { location: { state: { isAuthenticated = false } = {} } = {} } = rest;
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated
          ? (<Component {...props} />)
          : (<Redirect to="/login" />)
      )}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func
};

export default ProtectedRoute;