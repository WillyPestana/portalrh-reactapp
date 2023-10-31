import React, { useEffect, PropsWithChildren } from "react";
import {
  PublicClientApplication,
  LogLevel,
  AccountInfo,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID!,
    authority: process.env.REACT_APP_AZURE_AD_AUTHORITY!,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        if (level === LogLevel.Error) {
          console.error(message);
        }
      },
    },
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

interface AuthenticationProps {}

const Authentication: React.FC<PropsWithChildren<AuthenticationProps>> = ({
  children,
}) => {
  useEffect(() => {
    const loginSilent = async () => {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const silentRequest = {
          scopes: process.env.REACT_APP_AZURE_AD_SCOPES!.split(",") || [],
          account: accounts[0] as AccountInfo,
        };

        try {
          await msalInstance.acquireTokenSilent(silentRequest);
        } catch (error) {
          console.error("Error obtaining token silently:", error);
        }
      }
    };

    loginSilent();
  }, []);

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default Authentication;
