import { useEffect } from "react";
import { useMenu } from "./menu-context";
import { useEnv } from "./use-env";
import {
  SecureApiStates,
  useSecureApi,
} from "../components/security/hooks/use-secure-api";

export const useMenuItems = () => {
  const { createMenuItems, readMenuItems } = useMenu();
  const { apiServerRootUrl, auth0Audience } = useEnv();
  const items = readMenuItems();

  const { fetchState, data, error } = useSecureApi(
    `${apiServerRootUrl}/api/menu/items`,
    {
      audience: auth0Audience,
    }
  );

  useEffect(() => {
    if (fetchState === SecureApiStates.SUCCESS) {
      createMenuItems(data);
    }
  }, [fetchState]);

  return { items, error, fetchState };
};
