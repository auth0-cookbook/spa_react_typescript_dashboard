import React from "react";

import View from "../layout/view";
import Content from "../layout/content";
import GridItem from "../grid-item";
import Grid from "../grid";

import { MenuItem } from "../../models/menu.types";

import { useStoreState } from "../../store/store";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const MenuView: React.FC = () => {
  const history = useHistory();

  const { isAuthenticated } = useAuth0();

  const { items: menuItems } = useStoreState((state) => state.menu);
  const { menuError } = useStoreState((state) => state.menuUi);
  const { isMenuAdmin } = useStoreState((state) => state.user);

  const addMenuItem = (): void => {
    history.push(`/menu/add-item`);
  };

  const body = (
    <>
      {menuItems ? (
        <Grid>
          {Object.values(menuItems).map((menuItem: MenuItem) => (
            <GridItem
              key={menuItem.id}
              {...menuItem}
              content={menuItem.image}
            />
          ))}
        </Grid>
      ) : null}

      {menuError && <span>{menuError.message}</span>}
    </>
  );

  return (
    <View>
      {isAuthenticated && isMenuAdmin ? (
        <Content title="Menu Items" actionName="Add Item" action={addMenuItem}>
          {body}
        </Content>
      ) : (
        <Content title="Menu Items">{body}</Content>
      )}
    </View>
  );
};

export default MenuView;
