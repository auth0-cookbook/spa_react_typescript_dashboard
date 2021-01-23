import { useEffect, useState } from "react";
import { itemsReqUrl } from "../store/request-helpers";
import { FetchState, MenuError, MenuItems } from "../models/menu.types";
import { useMenu } from "../context/menu-context";

export const useMenuItems = () => {
  const [menuFetchError, setMenuFetchError] = useState<MenuError>();
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.FETCHING);

  const { createMenuItems, readMenuItems } = useMenu();
  const menuItems = readMenuItems();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch(itemsReqUrl);

        if (res.ok) {
          const menuItems: MenuItems = await res.json();
          console.log(menuItems);
          createMenuItems(menuItems);
          setFetchState(FetchState.FETCHED);
        }

        if (!res.ok) {
          const error = await res.json();

          setMenuFetchError({
            error: true,
            message: error.message,
          });

          setFetchState(FetchState.FETCH_ERROR);
        }
      } catch (e) {
        setMenuFetchError({
          error: true,
          message: e.message,
        });
        setFetchState(FetchState.FETCH_ERROR);
      }
    };

    fetchMenuItems();
  }, []);

  return { menuItems, fetchState, menuFetchError };
};
