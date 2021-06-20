import * as React from "react";
import { Redirect } from "react-router-dom";
import Page from "lib/layout/Page";

import FirebaseAuth from "app/FirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { useIsAuthenticated } from "lib/hooks/useIsAuthenticated";

export interface LoginPageProps {
  path?;
}

export function redirectLocationToString(location) {
  const { hash, pathname, search } = location;
  return `${pathname}${hash}${search}`;
}

export const LoginPage: React.SFC<any> = ({ match, location }) => {
  let signInSuccessUrl = "/";
  const [isLoading, hasAuth] = useIsAuthenticated();

  if (location.state && location.state.redirect) {
    signInSuccessUrl = redirectLocationToString(location.state.redirect);
  }

  const uiConfig = {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl,
  };

  if (hasAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Page isLoading={isLoading}>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Page>
  );
};

export default LoginPage;
