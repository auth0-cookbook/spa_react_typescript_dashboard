import { useEffect, useState } from "react";
import { FetchState, MenuError, MenuItem } from "../models/menu.types";
import { itemsPath, itemsReqUrl } from "../store/request-helpers";

export const useMenuItem = (id: number) => {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [menuItemFetchError, setMenuItemFetchError] = useState<MenuError>();
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.FETCHING);

  const itemReqUrl = new URL(`${itemsPath}/${id.toString()}`, itemsReqUrl).href;

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await fetch(itemReqUrl);
        const menuItem: MenuItem = await res.json();

        if (res.ok && menuItem) {
          setMenuItem(menuItem);
          setFetchState(FetchState.FETCHED);
        }

        if (!(res.ok && menuItem)) {
          setFetchState(FetchState.FETCH_NOT_FOUND);
        }
      } catch (e) {
        setMenuItemFetchError({
          error: true,
          message: e.message,
        });

        setFetchState(FetchState.FETCH_ERROR);
      }
    };

    fetchMenuItem();
  }, [itemReqUrl]);

  return { menuItem, menuItemFetchError, fetchState };
};
