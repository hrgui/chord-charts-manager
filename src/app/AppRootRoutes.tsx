import React from "react";
import { Switch, Route } from "react-router-dom";
import { LoginPage } from "app/session/LoginPage";
import { LogoutPage } from "app/session/LogoutPage";
import { ProtectedRoute } from "lib/router/ProtectedRoute";

export function AppRootRoutes() {
  return (
    <Switch>
      <Route component={LoginPage} path="/login" exact />
      <ProtectedRoute component={LogoutPage} path="/logout" exact />
    </Switch>
  );
}

export default AppRootRoutes;
