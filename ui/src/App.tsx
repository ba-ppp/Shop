import { Login } from "components/Auth/Login/Login";
import { SignUp } from "components/Auth/SignUp/SignUp";
import { Home } from "components/Home/Home";
import { NavBarMenu } from "components/NavBarMenu/NavBarMenu";
import { PageNotFound } from "components/PageNotFound/PageNotFound";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Redirect, Route, Switch } from "react-router-dom";
import { PublicRoute } from "routes/Public/PublicRoutes";
import "@rmwc/button/styles";
import "@rmwc/card/styles";
import "@rmwc/typography/styles";
import "@rmwc/menu/styles";
import { Detail } from "components/Detail/Detail";
import { Payment } from "components/Payment/Payment";
import { getItemFromLocalStorage } from "utils/utils";
import { useEffectOnce } from "react-use";
import { useDispatch } from "react-redux";
import { addArrayCartItems } from "app/slices/carts.slice";

function App() {
  const dispatch = useDispatch();
  useEffectOnce(() => {
    const items = getItemFromLocalStorage();
    dispatch(addArrayCartItems(items));
  });
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBarMenu />
      <Switch>
        <PublicRoute path="/" exact component={Home} />

        <PublicRoute path="/signin" exact component={Login} />
        <PublicRoute path="/signup" exact component={SignUp} />
        <PublicRoute path="/detail/:id" exact component={Detail} />

        {/* private */}
        <PublicRoute path="/payment" exact component={Payment} />

        <Route path="/404" component={PageNotFound} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
