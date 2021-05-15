import React from "react";

import { View } from "../components/layout/view";
import { Content } from "../components/layout/content";
import { GridItem } from "../components/ui/grid-item";
import { Grid } from "../components/ui/grid";

import { MenuItem } from "../models/menu.types";

import { useHistory } from "react-router-dom";
import { useMenuItems } from "../utils/use-menu-items";

import { useAccessRoles } from "../components/security/use-access-roles";
import { USER_ROLES } from "../components/security/user-roles";
import { SecureApiStates } from "../components/security/hooks/use-secure-api";
import { Loader } from "../components/ui/loader";

export const MenuItemsView: React.FC = React.memo(() => {
  const history = useHistory();

  const { error, items, fetchState } = useMenuItems();
  const { accessRoles } = useAccessRoles();

  const addMenuItem = (): void => {
    history.push(`/menu/add-item`);
  };

  if (
    fetchState === SecureApiStates.INITIAL ||
    fetchState === SecureApiStates.PENDING
  ) {
    return <Loader />;
  }
  
  

  if (fetchState === SecureApiStates.FAILURE) {
    return (
      error && (
        <View>
          <Content title="Menu Items">
            <span>{error.message}</span>
          </Content>
        </View>
      )
    );
  }

  if (fetchState === SecureApiStates.SUCCESS && !items) {
    return null;
  }

  if (fetchState === SecureApiStates.SUCCESS && items) {
    let body =
      items.length > 0 ? (
        <Grid>
          {items.map((menuItem: MenuItem) => (
            <GridItem
              key={menuItem.id}
              {...menuItem}
              content={menuItem.image}
            />
          ))}
        </Grid>
      ) : (
        <h2>There are no items.</h2>
      );

    if (accessRoles[USER_ROLES.MENU_ADMIN]) {
      return (
        <View>
          <Content
            title="Menu Items"
            actionName="+ Add Item"
            action={addMenuItem}
          >
            {body}
          </Content>
        </View>
      );
    }

    return (
      <View>
        <Content title="Menu Items">{body}</Content>
      </View>
    );
  }

  return null;
});
