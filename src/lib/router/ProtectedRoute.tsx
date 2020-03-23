import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from "lib/layout/PageLoading";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export function ProtectedRoute({ component: Component, ...rest }) {
  const [isLoading, hasAuth, user] = useIsAuthenticated();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.isNewUser) {
      enqueueSnackbar(t("newUser/sign_up_plz"), {
        key: "auth"
      });
    }

    return () => {
      //closeSnackbar("auth");
    };
  }, [user, isLoading, enqueueSnackbar, t]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (!hasAuth) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { redirect: props.location }
              }}
            />
          );
        }

        if (user.isNewUser) {
          return (
            <Redirect
              to={{
                pathname: "/group/signup"
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
}
