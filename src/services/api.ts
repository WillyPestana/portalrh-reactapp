import axios, { AxiosInstance } from "axios";
import { useMsal } from "@azure/msal-react";

const useApi = () => {
  const { instance, accounts } = useMsal();

  const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    if (accounts.length === 0) {
      //await instance.loginRedirect(); // ou instance.loginPopup()
    }

    const response = await instance.acquireTokenSilent({
      scopes: process.env.REACT_APP_AZURE_AD_SCOPES!.split(",") || [],
      account: accounts[0],
    });
    const accessToken = response.accessToken;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  });

  return api;
};

export default useApi;
