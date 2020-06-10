import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  return(
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;