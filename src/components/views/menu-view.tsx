import React, { useEffect, useState } from "react";

import View from "../layout/view";
import Content from "../layout/content";
import GridItem from "../grid-item";
import Grid from "../grid";

import { MenuError, MenuItem } from "../../models/menu.types";

import { History } from "history";
import { useAuth0 } from "@auth0/auth0-react";

interface IMenuViewProps {
  history: History;
}

const MenuView: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<MenuError | null>(null);

  const menuAdminRole: string = "menu-admin";
  const rolesProp: string = new URL(
    "roles",
    process.env.REACT_APP_AUTH0_AUDIENCE
  ).href;
  const userRoles: string[] = user[rolesProp];
  const isMenuAdmin: boolean = userRoles.includes(menuAdminRole);

  const addMenuItem = (): void => {
    // this.props.history.push(`/menu/add-item`);
  };

  useEffect(() => {
    const baseURL = process.env.REACT_APP_SERVER_URL;
    const path = "items";

    const reqUrl = new URL(path, baseURL).href;

    const fetchMenu = async () => {
      try {
        const res = await fetch(reqUrl);
        const json = await res.json();

        setMenuItems(Object.values(json));
      } catch (e) {
        setErrorMessage(e.message);
      }
    };

    fetchMenu();
  }, []);

  const body = (
    <>
      {menuItems ? (
        <Grid>
          {menuItems.map((menuItem: MenuItem) => (
            <GridItem
              key={menuItem.id}
              {...menuItem}
              content={menuItem.image}
            />
          ))}
        </Grid>
      ) : null}

      {errorMessage && <span>{errorMessage}</span>}
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
