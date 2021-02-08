import React, { ComponentClass, FunctionComponent } from "react";
import { Route, RouteProps } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loader } from "../ui/loader";

interface ProtectedRouteProps extends RouteProps {
  component: ComponentClass<any, any> | FunctionComponent<any>;
  path: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,

  ...args
}) => {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loader />,
      })}
      {...args}
    />
  );
};
