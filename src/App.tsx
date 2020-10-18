import React, { useEffect } from "react";

import NavBar from "./components/layout/nav-bar";
import { Switch, Redirect, Route, RouteComponentProps } from "react-router-dom";

import HomeView from "./components/views/home-view";
import MenuView from "./components/views/menu-view";
import Loading from "./components/loading";

import { useAuth0 } from "@auth0/auth0-react";

import "./app.scss";
import ProtectedRoute from "./components/auth/protected-route";
import UserProfileView from "./components/views/user-profile-view";
import MenuItemView from "./components/views/menu-item-view";
import { useStoreActions } from "./store/store";
import NotFoundView from "./components/views/not-found-view";
import EditItemView from "./components/views/edit-item-view";

function App() {
  const { isLoading, isAuthenticated, user } = useAuth0();

  const { fetchItems } = useStoreActions((actions) => actions.menu);

  const { updateAdmin } = useStoreActions((actions) => actions.user);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const menuAdminRole: string | null =
        process.env.REACT_APP_ADMIN_ROLE || null;

      const rolesProp: string = new URL(
        "roles",
        process.env.REACT_APP_AUTH0_AUDIENCE
      ).href;

      const userRoles: string[] = user[rolesProp];
      const isMenuAdmin: boolean = menuAdminRole
        ? userRoles.includes(menuAdminRole)
        : false;

      updateAdmin(isMenuAdmin);
    }
  });

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
        <ProtectedRoute path="/profile" component={UserProfileView} />
        <Route
          path="/menu"
          render={(props: RouteComponentProps) => {
            const path = props.match.path;

            return (
              <Switch>
                <Route exact path={`${path}/`} component={MenuView} />
                {/*<MenuAdminRoute*/}
                {/*  {...props}*/}
                {/*  redirectPath="/menu"*/}
                {/*  path={`${path}/add-item`}*/}
                {/*  component={AddItemView}*/}
                {/*/>*/}
                <ProtectedRoute
                  {...props}
                  path={`${path}/:menuItemId/edit-item`}
                  component={EditItemView}
                />
                <Route path={`${path}/:menuItemId`} component={MenuItemView} />
              </Switch>
            );
          }}
        />
        <Route component={NotFoundView} />
      </Switch>
    </div>
  );
}

export default App;
