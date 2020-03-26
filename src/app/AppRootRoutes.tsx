import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from "app/session/LoginPage";
import { LogoutPage } from "app/session/LogoutPage";
import { ProtectedRoute } from "lib/router/ProtectedRoute";
import SongsListPage from "app/songs/SongsListPage";
import SetlistsListPage from "app/setlists/SetlistsListPage";

export function AppRootRoutes() {
  return (
    <Switch>
      <Route component={LoginPage} path="/login" exact />
      <ProtectedRoute component={LogoutPage} path="/logout" exact />

      <ProtectedRoute component={SongsListPage} path="/songs" exact />
      <ProtectedRoute component={SetlistsListPage} path="/setlists" exact />
      <Redirect from="/" to="/songs" />
    </Switch>
  );
}

export default AppRootRoutes;
