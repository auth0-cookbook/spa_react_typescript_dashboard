import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { BaseMenuItem, MenuItem, MenuItems } from "../models/menu.types";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useEnv } from "../hooks/use-env";

const MenuContext = React.createContext<
  [MenuItems, Dispatch<SetStateAction<MenuItems>>] | undefined
>(undefined);

const MenuProvider: React.FC = (props) => {
  const [menuItems, setMenuItems] = useState<MenuItems>({});
  const value = React.useMemo<[MenuItems, Dispatch<SetStateAction<MenuItems>>]>(
    () => [menuItems, setMenuItems],
    [menuItems]
  );

  return <MenuContext.Provider value={value} {...props} />;
};

const useMenu = () => {
  const context = useContext(MenuContext);
  const { apiServerUrl } = useEnv();

  if (context === undefined) {
    throw new Error(`useMenu must be used within a MenuProvider`);
  }

  const [menuItems, setMenuItems] = context;

  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const createMenuItems = (newMenuItems: MenuItems) => {
    setMenuItems(newMenuItems);
  };

  const createMenuItem = async (newMenuItem: BaseMenuItem) => {
    if (!apiServerUrl) {
      return;
    }

    const token = await getAccessTokenSilently();

    try {
      const res = await fetch(apiServerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMenuItem),
      });

      if (res.ok) {
        await history.push("/menu");
      }
    } catch (e) {}
  };

  const readMenuItems = () => menuItems;

  const readMenuItem = (menuItemId: string) => menuItems[menuItemId];

  const updateMenuItem = async (updatedMenuItem: MenuItem) => {
    const itemReqUrl = `${apiServerUrl}/${updatedMenuItem.id}`;

    const token = await getAccessTokenSilently();

    try {
      const res = await fetch(itemReqUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMenuItem),
      });

      if (res.ok) {
        await history.push(`/menu/${updatedMenuItem.id}`);
      }
    } catch (e) {}
  };

  const deleteMenuItem = async (menuItemId: string) => {
    const itemReqUrl = `${apiServerUrl}/${menuItemId.toString()}`;

    const token = await getAccessTokenSilently();

    try {
      const { ok } = await fetch(itemReqUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (ok) {
        history.push("/menu");
      }
    } catch (e) {}
  };

  return {
    createMenuItem,
    createMenuItems,
    readMenuItems,
    readMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};

export { MenuProvider, useMenu };
