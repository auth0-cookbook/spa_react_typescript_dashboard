// src/auth/auth0-provider-with-history.js

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEnv } from "../../utils/use-env";

export const Auth0ProviderWithHistory: React.FC = ({ children }) => {
  const history = useHistory();
  const { auth0Domain, auth0ClientId, auth0Audience } = useEnv();

  const onRedirectCallback = (appState: any) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={auth0Domain || ""}
      clientId={auth0ClientId || ""}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={auth0Audience}
    >
      {children}
    </Auth0Provider>
  );
};
