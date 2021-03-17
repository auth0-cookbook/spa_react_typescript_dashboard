import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEnv } from "../../utils/use-env";
import { AccessRoles, AccessRoleState } from "../../models/auth.types";

export const useAccessRoles = (): {
  accessRoleState: AccessRoleState;
  accessRoles: AccessRoles;
} => {
  const [accessRoleState, setAccessRoleState] = useState<AccessRoleState>(
    AccessRoleState.FETCHING
  );
  const [accessRoles, setAccessRoles] = useState<AccessRoles>({});
  const { isLoading, isAuthenticated, user } = useAuth0();

  const { auth0Audience } = useEnv();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const rolesProp: string = new URL("roles", auth0Audience).href;
    const userRoles: string[] = user[rolesProp] || [];
    const rolesObj: { [index: string]: boolean } = {};

    for (const userRole of userRoles) {
      rolesObj[userRole] = true;
    }

    setAccessRoles(rolesObj);
    setAccessRoleState(AccessRoleState.FETCHED);
  }, [isLoading, isAuthenticated, user, auth0Audience]);

  return { accessRoleState, accessRoles };
};
