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
import { useEffectOnce, useLocation } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { addArrayCartItems } from "app/slices/carts.slice";
import { HomePage } from "components/HomePage/HomePage";
import { RootState } from "app/reducer/reducer";
import { HomeNavBar } from "components/NavBarMenu/HomeNavBar";
import { useEffect } from "react";
import { toggleMenuSelect } from "app/slices/toggle.slice";
import { Search } from "components/Search/Search";
import { isNil } from "lodash";
import { Admin } from 'components/Admin/Admin';
import { History } from 'components/History/History';
import './App.scss';

function App() {
  const dispatch = useDispatch();

  const toggle = useSelector((state: RootState) => state.toggle);

  useEffectOnce(() => {
    const items = getItemFromLocalStorage();
    dispatch(addArrayCartItems(items));
  });

  const location = useLocation();

  useEffect(() => {
    if (isNil(location.pathname)) return;

    const pathNotHaveMenu = ["/", "/search", "/history"];

    if (pathNotHaveMenu.includes(location.pathname)) {
      dispatch(toggleMenuSelect(false));
    } else {
      dispatch(toggleMenuSelect(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {toggle.hasMenuSelect ? <NavBarMenu /> : <HomeNavBar />}

      <Switch>
        <PublicRoute path="/" exact component={HomePage} />
        <PublicRoute path="/shop" exact component={Home} />


        <PublicRoute path="/detail/:id" exact component={Detail} />
        <PublicRoute path="/search" exact component={Search} />

        <PublicRoute path="/payment" exact component={Payment} />
        <PublicRoute path="/payment/:status" exact component={Payment} />

        <PublicRoute path="/admin" exact component={Admin} />

        <PublicRoute path="/history" exact component={History} />

        <Route path="/404" component={PageNotFound} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
