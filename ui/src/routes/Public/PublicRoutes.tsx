import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { getDomainWithoutSubdomain, hasSubdomain } from 'utils/utils';

export const PublicRoute = ({ component: Component, path, ...rest }: any) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => {
        return path === path.toLowerCase() ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to={path.toLowerCase()} />
            <Component {...props} />
          </>
        );
      }}
    />
  );
};
