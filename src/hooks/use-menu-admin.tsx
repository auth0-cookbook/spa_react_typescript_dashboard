import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useMenuAdmin = () => {
  const [isMenuAdmin, setMenuAdmin] = useState<boolean>(false);
  const { isLoading, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const menuAdminRole: string | null =
      process.env.REACT_APP_ADMIN_ROLE || null;

    const rolesProp: string = new URL(
      "roles",
      process.env.REACT_APP_AUTH0_AUDIENCE
    ).href;

    const userRoles: string[] = user[rolesProp];
    const isMenuAdmin: boolean = menuAdminRole
      ? userRoles.includes(menuAdminRole)
      : false;

    setMenuAdmin(isMenuAdmin);
  }, [isLoading, isAuthenticated, user]);

  return isMenuAdmin;
};
