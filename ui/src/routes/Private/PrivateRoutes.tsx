import React from "react";
import { Route } from "react-router-dom";
import { getToken } from "utils/utils";
// import { getDomainWithoutSubdomain, getToken } from '../../utils/utils';

type Props = {
  path: string;
  component: any;
  exact?: boolean;
};

export const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={(props) => {
      if (!getToken()) {
        window.location.replace('/signin');
      }
      return <Component {...props} />;
    }}
  />
);
