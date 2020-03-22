import React from "react";
import { Switch } from "react-router-dom";

export function AppRootRoutes({ children }: { children? }) {
  return <Switch>{children}</Switch>;
}

export default AppRootRoutes;
