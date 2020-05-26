import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { LoginPage } from "app/session/LoginPage";
import { LogoutPage } from "app/session/LogoutPage";
import { ProtectedRoute } from "lib/router/ProtectedRoute";
import SongsListPage from "app/songs/SongsListPage";
import SetlistsListPage from "app/setlists/SetlistsListPage";
import SongViewPage from "app/songs/SongViewPage";
import SongFormPage from "app/songs/form/SongFormPage";
import SetlistFormPage from "app/setlists/form/SetlistFormPage";
import AddToSetlistFormPage from "app/setlists/form/AddToSetlistFormPage";
import SetlistViewPage from "app/setlists/SetlistViewPage";
import RouteModal from "app/core/RouteModal";
import SignupGroupPage from "app/groups/SignupGroupPage";
import GroupsListPage from "app/groups/GroupsListPage";
import GroupFormPage from "app/groups/GroupFormPage";

export function AppRootRoutes() {
  const location = useLocation<any>();
  const background = location.state?.background;
  return (
    <>
      <Switch location={background || location}>
        <Route component={LoginPage} path="/login" exact />
        <ProtectedRoute component={LogoutPage} path="/logout" exact />

        <ProtectedRoute component={SongsListPage} path="/songs" exact />
        <ProtectedRoute component={SongViewPage} path="/song/:id/view" exact />
        <ProtectedRoute exact component={SongFormPage} path="/song/new" />
        <ProtectedRoute exact component={SongFormPage} path="/song/:id/edit" />

        <ProtectedRoute component={SetlistFormPage} path="/setlist/new" exact />
        <ProtectedRoute component={SetlistsListPage} path="/setlists" exact />
        <ProtectedRoute
          component={AddToSetlistFormPage}
          path="/setlist/add"
          exact
        />
        <ProtectedRoute
          component={SetlistFormPage}
          path="/setlist/:id/edit"
          exact
        />
        <ProtectedRoute
          component={SetlistViewPage}
          path="/setlist/:id/:songIndex?"
          exact
        />
        <Route component={SignupGroupPage} path="/group/signup" exact />
        <ProtectedRoute component={GroupsListPage} path="/admin/groups" exact />
        <ProtectedRoute
          component={GroupFormPage}
          path="/admin/group/new"
          exact
        />
        <ProtectedRoute
          component={GroupFormPage}
          path="/admin/group/:id/edit"
          exact
        />
        <Redirect from="/" to="/songs" />
      </Switch>
      {background && (
        <RouteModal open={!!background}>
          <Switch location={location}>
            <ProtectedRoute
              component={AddToSetlistFormPage}
              path="/setlist/add"
              exact
            />
            <ProtectedRoute
              component={SetlistFormPage}
              path="/setlist/new"
              exact
            />
            <ProtectedRoute
              component={SetlistFormPage}
              path="/setlist/:id/edit"
              exact
            />
          </Switch>
        </RouteModal>
      )}
    </>
  );
}

export default AppRootRoutes;
