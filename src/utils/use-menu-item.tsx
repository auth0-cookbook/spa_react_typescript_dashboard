import { useEffect, useState } from "react";
import { FetchState, MenuError, MenuItem } from "../models/menu.types";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEnv } from "./use-env";

export const useMenuItem = (id: string) => {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [menuItemFetchError, setMenuItemFetchError] = useState<MenuError>();
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.FETCHING);
  const { apiServerRootUrl } = useEnv();

  const itemReqUrl = `${apiServerRootUrl}/api/menu/items/${id.toString()}`;

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response: AxiosResponse = await axios.get(itemReqUrl);
        const { data }: { data: MenuItem } = response;

        if (data) {
          setMenuItem(data);
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
