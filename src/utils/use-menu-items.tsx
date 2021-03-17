import { useEffect, useState } from "react";
import { FetchState, MenuError, MenuItems } from "../models/menu.types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMenu } from "./menu-context";
import { useEnv } from "./use-env";

export const useMenuItems = () => {
  const [menuFetchError, setMenuFetchError] = useState<MenuError>();
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.FETCHING);

  const { createMenuItems } = useMenu();
  const { apiServerRootUrl } = useEnv();

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!apiServerRootUrl) {
        return;
      }

      try {
        const response: AxiosResponse = await axios.get(
          `${apiServerRootUrl}/api/menu/items`
        );

        const { data }: { data: MenuItems } = response;

        if (data) {
          createMenuItems(data);
          setFetchState(FetchState.FETCHED);
        }
      } catch (e) {
        const error = e as AxiosError;
        let errorMessage = undefined;

        if (error.response) {
          const { data, status } = error.response;
          const { message } = data;

          errorMessage = message || "Unable to fetch items";

          setMenuFetchError({ status, message: errorMessage });

          setFetchState(FetchState.FETCH_ERROR);
        }
      }
    };

    fetchMenuItems();
  }, []);

  return { fetchState, menuFetchError };
};
