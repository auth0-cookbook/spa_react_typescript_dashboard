import { useState } from "react";

export const useEnv = () => {
  const [auth0Domain] = useState(process.env.REACT_APP_AUTH0_DOMAIN);
  const [auth0ClientId] = useState(process.env.REACT_APP_AUTH0_CLIENT_ID);
  const [auth0Audience] = useState(process.env.REACT_APP_AUTH0_AUDIENCE);
  const [apiServerRootUrl] = useState(
    process.env.REACT_APP_API_SERVER_ROOT_URL
  );

  return {
    auth0Domain,
    auth0ClientId,
    auth0Audience,
    apiServerRootUrl,
  };
};
