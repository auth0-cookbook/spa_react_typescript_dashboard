import React from "react";

import NavBar from "./components/layout/nav-bar";
import { Switch, Redirect, Route } from "react-router-dom";

import HomeView from "./components/views/home-view";
import MenuView from "./components/views/menu-view";
import Loading from "./components/loading";

import { useAuth0 } from "@auth0/auth0-react";

import "./app.scss";
import ProtectedRoute from "./components/auth/protected-route";
import UserProfileView from "./components/views/user-profile-view";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <div id="mask" />
      <NavBar />
      <Switch>
        <Redirect exact to="/home" from="/" />
        <Route path="/home" component={HomeView} />
        <Route path="/menu" component={MenuView} />
        <ProtectedRoute path="/profile" component={UserProfileView} />
      </Switch>
    </div>
  );
}

export default App;
