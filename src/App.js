import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Routes } from "./routes/routes";
import Spinner from "./component/Spinner";
import Snackbar from "./component/snackBar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {Routes.map(route => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
        <Spinner />
        <Snackbar />
      </BrowserRouter>
    </>
  );
}

export default App;
