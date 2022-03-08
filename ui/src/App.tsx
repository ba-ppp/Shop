import { Login } from "components/Auth/Login/Login";
import { SignUp } from "components/Auth/SignUp/SignUp";
import { Home } from "components/Home/Home";
import { NavBarMenu } from "components/NavBarMenu/NavBarMenu";
import { PageNotFound } from "components/PageNotFound/PageNotFound";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Redirect, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "routes/Private/PrivateRoutes";
import { PublicRoute } from "routes/Public/PublicRoutes";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBarMenu />
      <Switch>
        <PublicRoute path="/" exact component={Home} />

        <PublicRoute path="/signin" exact component={Login} />
        <PublicRoute path="/signup" exact component={SignUp} />

        <Route path="/404" component={PageNotFound} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
