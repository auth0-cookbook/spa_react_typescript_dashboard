import React from "react";

import { View } from "../components/layout/view";
import { Content } from "../components/layout/content";
import { GridItem } from "../components/ui/grid-item";
import { Grid } from "../components/ui/grid";

import { FetchState, MenuItem } from "../models/menu.types";

import { useHistory } from "react-router-dom";
import { useMenuItems } from "../utils/use-menu-items";

import { useMenu } from "../utils/menu-context";

import { useAccessRoles } from "../components/security/use-access-roles";
import { USER_ROLES } from "../components/security/user-roles";

export const MenuItemsView: React.FC = React.memo(() => {
  const history = useHistory();

  const { menuFetchError, fetchState } = useMenuItems();
  const { readMenuItems } = useMenu();
  const { accessRoles } = useAccessRoles();

  const menuItems = Object.values(readMenuItems());

  const addMenuItem = (): void => {
    history.push(`/menu/add-item`);
  };

  let body = null;

  if (fetchState === FetchState.FETCH_ERROR) {
    body = menuFetchError && <span>{menuFetchError.message}</span>;
  }

  if (fetchState === FetchState.FETCHED && menuItems.length > 0) {
    body = menuItems && (
      <Grid>
        {menuItems.map((menuItem: MenuItem) => (
          <GridItem key={menuItem.id} {...menuItem} content={menuItem.image} />
        ))}
      </Grid>
    );
  }

  if (fetchState === FetchState.FETCHED && menuItems.length === 0) {
    body = (
      <>
        <h2>There are no items.</h2>
      </>
    );
  }

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
});
