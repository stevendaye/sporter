import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./components/routes/Routes";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import setAuthTokenHeader from "./utils/setAuthTokenHeader";
import { doLoadUserWithErrorCheck } from "./thunks/register";
import doStoreEventsWithErrorCheck, { doGetEventsWithErrorCheck } from "./thunks/events";
import "./assets/stylesheets/App.css";

if (localStorage.token) {
  setAuthTokenHeader(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(doLoadUserWithErrorCheck());
    store.dispatch(doStoreEventsWithErrorCheck());
    store.dispatch(doGetEventsWithErrorCheck());
  }, []);

  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <div className = "wrapper">
            <Navbar/>
            <Switch>
              <Route exact path = "/" component = { Landing } />
              <Route exact path = "/login" component = { Login } />
              <Route exact path = "/register" component = { Register } />
              <Route component = { Routes } />
            </Switch>
            <Footer/>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
