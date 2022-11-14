import React, { Suspense } from "react";
import GridFullHeight from "components/GridFullHeight";
import { Route, Switch } from "react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import loading from "asset/img/loading.svg";

import Login from "pages/Login";
import OCR from "pages/OCR";
import InforCustomer from "pages/InforCustomer";
import RegisterInforCustomer from "pages/RegisterInforCustomer";
import Home from "pages/Home";
import MyApp from "pages/MyApp";

import OnlyPublicRoute from "./OnlyPublic";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
// import NotFoundPage from "pages/NotFound";

const mapStateToProps = (state: reducerType) => ({ auth: state.auth });

type RoutesProps = ReturnType<typeof mapStateToProps>;

const Routes = (props: RoutesProps) => (
  <Suspense
    fallback={
      <GridFullHeight
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <img width={50} height={50} src={loading} alt="loading" />
      </GridFullHeight>
    }
  >
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={Home}
        // isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.id)}
      />
      <PrivateRoute
        exact
        path="/ocr"
        component={OCR}
        // isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.id)}
      />
      <PrivateRoute
        exact
        path="/infor-customer"
        component={InforCustomer}
        // isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.id)}
      />
      <PrivateRoute
        exact
        path="/register-customer"
        component={RegisterInforCustomer}
        isLoggedIn={Boolean(props.auth.current_user.id)}
      />
      <OnlyPublicRoute
        path={"/login"}
        component={Login}
        isLoggedIn={Boolean(props.auth.current_user.id)}
      />
      <PrivateRoute
        exact
        path="/my-app"
        component={MyApp}
        // isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.id)}
      />
      {/* <Route path="*" exact={true} component={NotFoundPage} /> */}
    </Switch>
  </Suspense>
);

export default connect(mapStateToProps)(Routes);
