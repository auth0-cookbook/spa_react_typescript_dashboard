import React from "react";

import { View } from "../../layout/view";
import { Content } from "../../layout/content";
import { GridItem } from "../../ui/grid-item";
import { Grid } from "../../ui/grid";

import { FetchState, MenuItem } from "../../../models/menu.types";

import { useHistory } from "react-router-dom";
import { useMenuItems } from "../../../hooks/use-menu-items";
import { useMenuAdmin } from "../../../hooks/use-menu-admin";
import { useMenu } from "../../../context/menu-context";

export const MenuItemsView: React.FC = React.memo(() => {
  const history = useHistory();

  const { menuFetchError, fetchState } = useMenuItems();
  const { readMenuItems } = useMenu();
  const isMenuAdmin = useMenuAdmin();

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

  if (isMenuAdmin) {
    return (
      <View>
        <Content title="Menu Items" actionName="Add Item" action={addMenuItem}>
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
