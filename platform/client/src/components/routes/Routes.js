import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Events from "../dashbord/Events";
import NotFound from "../layout/NotFound";

const Routes = () =>
  <Fragment>
    <section className = "container">
      <Switch>
        <PrivateRoute exact path = "/events" component = { Events } />
        <Route component = { NotFound } />
      </Switch>
    </section>
  </Fragment>

export default Routes;
