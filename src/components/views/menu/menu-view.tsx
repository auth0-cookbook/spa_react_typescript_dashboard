import React from "react";

import { Route, Switch, RouteComponentProps } from "react-router-dom";

import { ProtectedRoute } from "../../security/protected-route";
import { AddItemView } from "./add-item-view";
import { EditItemView } from "./edit-item-view";
import { MenuItemView } from "./menu-item-view";
import { MenuItemsView } from "./menu-items-view";
import { DeleteItemView } from "./delete-item-view";

export const MenuView: React.FC<RouteComponentProps> = React.memo(
  ({ match }) => {
    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={MenuItemsView} />
        <ProtectedRoute
          path={`${match.url}/add-item`}
          component={AddItemView}
        />
        <ProtectedRoute
          path={`${match.url}/:menuItemId/edit-item`}
          component={EditItemView}
        />
        <ProtectedRoute
          path={`${match.url}/:menuItemId/delete-item`}
          component={DeleteItemView}
        />
        <Route path={`${match.url}/:menuItemId`} component={MenuItemView} />
      </Switch>
    );
  }
);
