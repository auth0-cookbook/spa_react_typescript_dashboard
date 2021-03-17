import React from "react";

import { Route, Switch, RouteComponentProps } from "react-router-dom";

import { AddItemView } from "./add-item-view";
import { EditItemView } from "./edit-item-view";
import { MenuItemView } from "./menu-item-view";
import { MenuItemsView } from "./menu-items-view";
import { DeleteItemView } from "./delete-item-view";
import { MenuAdminRoute } from "../components/security/menu-admin-route";
import { useAuth0 } from "@auth0/auth0-react";

export const MenuView: React.FC<RouteComponentProps> = React.memo(
  ({ match }) => {
    const { isLoading } = useAuth0();

    if (isLoading) {
      return null;
    }

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={MenuItemsView} />
        <MenuAdminRoute
          path={`${match.url}/add-item`}
          component={AddItemView}
        />
        <MenuAdminRoute
          path={`${match.url}/:menuItemId/edit-item`}
          component={EditItemView}
        />
        <MenuAdminRoute
          path={`${match.url}/:menuItemId/delete-item`}
          component={DeleteItemView}
        />
        <Route path={`${match.url}/:menuItemId`} component={MenuItemView} />
      </Switch>
    );
  }
);
