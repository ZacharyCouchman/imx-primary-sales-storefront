import { Environment } from "@imtbl/sdk/x";

export const applicationEnvironment = import.meta.env.VITE_IMMUTABLE_ENVIRONMENT.toLowerCase() === Environment.PRODUCTION
  ? Environment.PRODUCTION
  : Environment.SANDBOX

const config = {
  [Environment.SANDBOX]: {
    immutablePublishableKey: import.meta.env.VITE_SANDBOX_IMMUTABLE_PUBLISHABLE_KEY,
    passportClientId: import.meta.env.VITE_SANDBOX_PASSPORT_CLIENT_ID,
    passportRedirectUri: import.meta.env.VITE_SANDBOX_PASSPORT_LOGIN_REDIRECT_URI,
    passportLogoutRedirectUri: import.meta.env.VITE_SANDBOX_PASSPORT_LOGOUT_REDIRECT_URI,
    primarySaleBackendUrl: import.meta.env.VITE_PRIMARY_SALE_BACKEND_URL,
    hubEnvironmentId: import.meta.env.VITE_HUB_ENVIRONMENT_ID,
    explorerUrl: "https://explorer.testnet.immutable.com",
  },
  [Environment.PRODUCTION]: {
    immutablePublishableKey: import.meta.env.VITE_MAINNET_IMMUTABLE_PUBLISHABLE_KEY,
    passportClientId: import.meta.env.VITE_MAINNET_PASSPORT_CLIENT_ID,
    passportRedirectUri: import.meta.env.VITE_MAINNET_PASSPORT_LOGIN_REDIRECT_URI,
    passportLogoutRedirectUri: import.meta.env.VITE_MAINNET_PASSPORT_LOGOUT_REDIRECT_URI,
    primarySaleBackendUrl: import.meta.env.VITE_PRIMARY_SALE_BACKEND_URL,
    hubEnvironmentId: import.meta.env.VITE_HUB_ENVIRONMENT_ID,
    explorerUrl: "https://explorer.immutable.com",
  },
};

export default config;
