import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useAccessToken = (
  audience: string | undefined,
  scope: string | undefined
) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenError, setAccessTokenError] = useState<Error | null>(null);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!audience) {
      setAccessTokenError(
        new Error("unable to fetch access token, Auth0 audience is undefined")
      );
      return;
    }

    const getAccessToken = async () => {
      try {
        setAccessToken(await getAccessTokenSilently({ audience, scope }));
      } catch (e) {
        setAccessTokenError(e);
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently, audience, scope]);

  return { accessToken, accessTokenError };
};
