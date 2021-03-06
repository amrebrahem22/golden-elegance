import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./Hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import Home from "./containers/Home";

const BaseRouter = () => {
  return (
    <Hoc>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profile/:username" component={Profile} />
    </Hoc>
  );
};

export default BaseRouter;
