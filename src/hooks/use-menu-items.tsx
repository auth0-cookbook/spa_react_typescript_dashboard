import { useEffect, useState } from "react";
import { FetchState, MenuError, MenuItems } from "../models/menu.types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMenu } from "../context/menu-context";
import { useEnv } from "./use-env";

export const useMenuItems = () => {
  const [menuFetchError, setMenuFetchError] = useState<MenuError>();
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.FETCHING);

  const { createMenuItems } = useMenu();
  const { apiServerUrl } = useEnv();

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!apiServerUrl) {
        return;
      }

      try {
        const response: AxiosResponse = await axios.get(apiServerUrl);

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
  }, [apiServerUrl, createMenuItems]);

  return { fetchState, menuFetchError };
};
