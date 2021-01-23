import React from "react";

import { View } from "../../layout/view";
import { Content } from "../../layout/content";
import { GridItem } from "../../grid-item";
import { Grid } from "../../grid";

import { FetchState, MenuItem } from "../../../models/menu.types";

import { useHistory } from "react-router-dom";
import { useMenuItems } from "../../../hooks/use-menu-items";
import { useMenuAdmin } from "../../../hooks/use-menu-admin";

export const MenuItemsView: React.FC = React.memo(() => {
  const history = useHistory();

  const { menuItems, menuFetchError, fetchState } = useMenuItems();
  const isMenuAdmin = useMenuAdmin();

  const addMenuItem = (): void => {
    history.push(`/menu/add-item`);
  };

  let body = null;

  if (fetchState === FetchState.FETCH_ERROR) {
    body = menuFetchError && <span>{menuFetchError.message}</span>;
  }

  if (fetchState === FetchState.FETCHED) {
    body = menuItems && (
      <Grid>
        {Object.values(menuItems).map((menuItem: MenuItem) => (
          <GridItem key={menuItem.id} {...menuItem} content={menuItem.image} />
        ))}
      </Grid>
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
