import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./main_layout/layout";
import { Routes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
          <Layout>
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
          </Layout>
      </BrowserRouter>
  );
}

export default App;
