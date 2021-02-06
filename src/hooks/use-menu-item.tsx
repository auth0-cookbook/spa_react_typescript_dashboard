import { useEffect, useState } from "react";
import {
  FetchState,
  MenuError,
  MenuItem,
  MenuItems,
} from "../models/menu.types";

import axios, { AxiosError, AxiosResponse } from "axios";

export const useMenuItem = (id: number) => {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [menuItemFetchError, setMenuItemFetchError] = useState<MenuError>();
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.FETCHING);

  const itemReqUrl = `${process.env.REACT_APP_API_SERVER_URL}/${id.toString()}`;

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response: AxiosResponse = await axios.get(itemReqUrl);
        const { data }: { data: MenuItems } = response;

        if (data) {
          setMenuItem(menuItem);
          setFetchState(FetchState.FETCHED);
        }
      } catch (e) {
        const error = e as AxiosError;
        let errorMessage = undefined;

        if (error.response) {
          const { data, status } = error.response;
          const { message } = data;

          errorMessage = message || "Unable to fetch items";

          setMenuItemFetchError({ status, message: errorMessage });

          setFetchState(FetchState.FETCH_ERROR);
        }
      }
    };

    fetchMenuItem();
  }, [itemReqUrl]);

  return { menuItem, menuItemFetchError, fetchState };
};
