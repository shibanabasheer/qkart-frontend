import React from 'react';
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";
import { Suspense } from "react";


export const config = {
   endpoint: `https://qkart-frontend-v2-6o9c.onrender.com/api/v1`,
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
        <Route path="/thanks">
          <Thanks />
        </Route>
        </Suspense>
        
      </Switch>
         
    </div>
    
  );
}

export default App;
