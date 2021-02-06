import { useEffect, useState } from "react";
import { FetchState, MenuError, MenuItems } from "../models/menu.types";
import { useMenu } from "../context/menu-context";
import axios, { AxiosError, AxiosResponse } from "axios";

export const useMenuItems = () => {
  const [menuFetchError, setMenuFetchError] = useState<MenuError>();
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.FETCHING);

  const { createMenuItems } = useMenu();
  // const menuItems = readMenuItems();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

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
  }, []);

  return { fetchState, menuFetchError };
};
