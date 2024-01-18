import React from 'react';
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import { Suspense } from "react";


export const config = {
   endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
      <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Switch>
        <Suspense fallback={<h1>Loading</h1>}>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Products />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        </Suspense>
        
      </Switch>
         
    </div>
    
  );
}

export default App;
