import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import configuration from "utilities/apis/configuration";

import 'scss/App.scss'

import LoginPage from "app/feature/Login";
import BoardPage from "app/feature/BoardPage/BoardPage";
import WorkSpacePage from "app/feature/WorkSpacePage/WorkSpacePage";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const reducerToken = useSelector((state) => state.getToken.token);
  useEffect(() => {
    if (
      configuration.ApiRequestToken === "" ||
      !configuration.ApiRequestToken
    ) {
      if (reducerToken !== "") {
        configuration.ApiRequestToken = reducerToken?.access?.token;
      }
    }
  }, [configuration]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        reducerToken === "" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
  return (
      <BrowserRouter>
      <ReactNotification />
      <Switch>
        <Route path="/" exact />
        <PrivateRoute path="/login" component={LoginPage} />;
        <PrivateRoute path="/register" component={LoginPage} />
        <PrivateRoute path="/forgot_password" component={LoginPage} />
        <PrivateRoute path="/reset/:token" component={LoginPage} />
        <Route path="/board" component={BoardPage} />
        <Route path="/workspace" component={WorkSpacePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
