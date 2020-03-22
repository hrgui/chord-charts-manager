import firebase from "firebase/app";
import gqlClient from "app/graphql/client";
import { gql } from "@apollo/client";

export function logout() {
  return firebase.auth().signOut();
}

export function onLoginFailed(e) {
  console.error(e);
}

export async function getCurrentUser(): Promise<any> {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return null;
  }

  return currentUser;
}

export async function getAuthToken(forceRefresh: boolean = false) {
  const currentUser = await getCurrentUser();
  return currentUser.getIdToken(forceRefresh);
}

export async function applySessionToken() {
  const idToken = await getAuthToken();
  document.cookie = "__session=" + idToken + ";max-age=3600";
}

export function onLoginSuccess(result) {
  return result;
}

export async function session(currentGroupId?) {
  let session: any = await gqlClient.mutate({
    mutation: gql`
      mutation setSession($currentGroupId: String) {
        session(currentGroupId: $currentGroupId)
      }
    `,
    variables: {
      currentGroupId
    }
  });
  return session.data.session;
}

export function extractUserData({
  displayName,
  email,
  emailVerified,
  isAnonymous,
  metadata,
  phoneNumber,
  photoURL,
  providerData,
  providerId,
  refreshToken,
  uid
}) {
  return {
    displayName,
    email,
    emailVerified,
    isAnonymous,
    metadata,
    phoneNumber,
    photoURL,
    providerData,
    providerId,
    refreshToken,
    uid
  };
}

export function isAuthenticatedThroughFirebase() {
  return new Promise(resolve =>
    firebase.auth().onAuthStateChanged(user => resolve(user))
  );
}

let checkingAuth;
export async function isAuthenticated() {
  if (checkingAuth) {
    return checkingAuth;
  }
  checkingAuth = _isAuthenticated();
  const res = await checkingAuth;
  checkingAuth = null;
  return res;
}

export async function _isAuthenticated() {
  // check firebase - are we auth there? - if so this will add the header
  await isAuthenticatedThroughFirebase();

  // then pass it through our API
  const sessionData = await session();
  if (sessionData) {
    return Promise.resolve({
      ...sessionData
    });
  }

  return null;
}
