import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEnv } from "./use-env";

export const useMenuAdmin = () => {
  const [isMenuAdmin, setMenuAdmin] = useState<boolean>(false);
  const { isLoading, isAuthenticated, user } = useAuth0();

  const { adminRole, auth0Audience } = useEnv();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const menuAdminRole: string | null = adminRole || null;

    const rolesProp: string = new URL("roles", auth0Audience).href;

    const userRoles: string[] = user[rolesProp] || [];

    const isMenuAdmin: boolean = menuAdminRole
      ? userRoles.includes(menuAdminRole)
      : false;

    setMenuAdmin(isMenuAdmin);
  }, [isLoading, isAuthenticated, user, adminRole, auth0Audience]);

  return isMenuAdmin;
};
