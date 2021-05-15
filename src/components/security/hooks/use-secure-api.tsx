import { useEffect, useRef, useState } from "react";
import { useAccessToken } from "./use-access-token";
import axios, { AxiosRequestConfig } from "axios";

export const SecureApiStates = {
  INITIAL: "initial",
  PENDING: "pending",
  SUCCESS: "success",
  FAILURE: "failure",
};

interface Auth0Config {
  audience?: string;
  scope?: string;
}

interface RequestConfig extends AxiosRequestConfig {}

export const useSecureApi = (
  url: string,
  auth0Config: Auth0Config,
  requestConfig?: RequestConfig
) => {
  const [fetchState, setFetchState] = useState(SecureApiStates.INITIAL);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const { audience, scope } = auth0Config;
  const { current: axiosConfig } = useRef(requestConfig || {});

  const { accessToken, accessTokenError } = useAccessToken(audience, scope);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axiosConfig.headers = {
          ...axiosConfig.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        const { data } = await axios(url, axiosConfig);

        setData(data);
        setFetchState(SecureApiStates.SUCCESS);
      } catch (error) {
        let errorMessage =
          error.response?.data.message ||
          error.message ||
          "unable to load data";

        setError(errorMessage);
        setFetchState(SecureApiStates.FAILURE);
      }
    };

    if (accessTokenError) {
      setFetchState(SecureApiStates.FAILURE);
      setError(accessTokenError);
      return;
    }

    if (accessToken) {
      setFetchState(SecureApiStates.PENDING);
      fetchData();
    }
  }, [accessToken, accessTokenError, url, axiosConfig]);

  return { data, fetchState, error };
};
