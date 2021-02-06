import React from "react";

import { Switch, Redirect, Route } from "react-router-dom";

import { HomeView } from "./components/views/home/home-view";
import { MenuView } from "./components/views/menu/menu-view";

import { ProtectedRoute } from "./components/security/protected-route";
import { UserProfileView } from "./components/views/user-profile/user-profile-view";

import { NotFoundView } from "./components/views/common/not-found-view";

import { Loading } from "./components/ui/loading";

import "./app.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "./components/layout/nav-bar";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="App">
        <div id="mask" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="App">
      <div id="mask" />
      <NavBar appName="Auth0 Eats" />
      <Switch>
        <Redirect exact to="/home" from="/" />
        <Route path="/home" component={HomeView} />
        <ProtectedRoute path="/profile" component={UserProfileView} />
        <Route path="/menu" component={MenuView} />
        <Route component={NotFoundView} />
      </Switch>
    </div>
  );
};
