/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_GRAPHQL_API: string;
  VITE_APP_USE_DEV_AUTH: number;
  VITE_APP_DEV_AUTH_UID: string;
  VITE_APP_DEV_AUTH_DISPLAY_NAME: string;
  VITE_APP_DEV_AUTH_CURRENT_GROUP_ID: string;
  VITE_APP_DEV_AUTH_ROLE: string;
}
