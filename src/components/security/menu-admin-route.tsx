import React, { ComponentClass, FunctionComponent } from "react";
import { ProtectedRoute } from "./protected-route";

import { useMenuAdmin } from "../../hooks/use-menu-admin";
import { Redirect } from "react-router-dom";

interface IMenuAdminRouteProps {
  path: string;
  component: ComponentClass<any, any> | FunctionComponent<any>;
  redirectPath?: string;
}

export const MenuAdminRoute: React.FC<IMenuAdminRouteProps> = (props) => {
  const isMenuAdmin = useMenuAdmin();

  return isMenuAdmin ? (
    <ProtectedRoute {...props} />
  ) : (
    <Redirect to={props.redirectPath || "/"} />
  );
};
