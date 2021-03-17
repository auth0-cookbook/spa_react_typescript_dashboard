import React, { ComponentClass, FunctionComponent } from "react";
import { ProtectedRoute } from "./protected-route";

import { useAccessRoles } from "./use-access-roles";
import { Redirect } from "react-router-dom";
import { AccessRoleState } from "../../models/auth.types";
import { USER_ROLES } from "./user-roles";

interface IMenuAdminRouteProps {
  path: string;
  component: ComponentClass<any, any> | FunctionComponent<any>;
  redirectPath?: string;
}

export const MenuAdminRoute: React.FC<IMenuAdminRouteProps> = (props) => {
  const { accessRoles, accessRoleState } = useAccessRoles();

  if (accessRoleState === AccessRoleState.FETCHING) {
    return null;
  }

  return accessRoles[USER_ROLES.MENU_ADMIN] ? (
    <ProtectedRoute {...props} />
  ) : (
    <Redirect to={props.redirectPath || "/"} />
  );
};
