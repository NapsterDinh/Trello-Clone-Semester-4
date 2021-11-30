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

  const PublicRoute = ({ component: Component, ...rest }) => {
    return(
      <Route
      {...rest}
      render={(props) =>
        reducerToken === "" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/workspace',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )};

  const PrivateRoute = ({ component: Component, ...rest }) => {
    if(reducerToken === "")
    {
      return(
          <Route
            {...rest}
            render={(props) =>(
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}/>
              )
            }
        />
      )
        
    }
    else
    {
      return(
        <Route
            {...rest}
            render={(props) =>
              <Component {...props} />
            }
          />
      )
    }
  };

  return (
      <BrowserRouter>
      <ReactNotification />
      <Switch>
        <Route path="/" exact />
        <PublicRoute path="/login" component={LoginPage} />;
        <PublicRoute path="/register" component={LoginPage} />
        <PublicRoute path="/forgot_password" component={LoginPage} />
        <PublicRoute path="/reset/:token" component={LoginPage} />
        <PrivateRoute path="/workspace" component={WorkSpacePage} />
        <Route path="/board" component={BoardPage} />
        {/* <Route path="/workspace" component={WorkSpacePage} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
