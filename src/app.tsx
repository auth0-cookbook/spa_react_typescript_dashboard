import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { ProtectedRoute } from "./components/security/protected-route";
import { NavBar } from "./components/layout/nav-bar";
import { Loader } from "./components/ui/loader";

import { HomeView } from "./views/home-view";
import { MenuView } from "./views/menu-view";
import { UserProfileView } from "./views/user-profile-view";
import { NotFoundView } from "./views/not-found-view";

import { useAuth0 } from "@auth0/auth0-react";

import "./app.scss";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Redirect exact to="/home" from="/" />
        <Route path="/home" component={HomeView} />
        <Route path="/menu" component={MenuView} />
        <ProtectedRoute path="/profile" component={UserProfileView} />
        <Route component={NotFoundView} />
      </Switch>
    </div>
  );
};
