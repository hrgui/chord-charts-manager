import * as util from "@firebase/util";

export function getDevUser() {
  return {
    uid: process.env.REACT_APP_DEV_AUTH_UID,
    displayName: process.env.REACT_APP_DEV_AUTH_DISPLAY_NAME,
    currentGroupId: process.env.REACT_APP_DEV_AUTH_CURRENT_GROUP_ID,
    role: process.env.REACT_APP_DEV_AUTH_ROLE,
  };
}

export function getDevAuthToken() {
  const user = (window as any).store
    ? (window as any).store.getState().auth.user
    : getDevUser();

  return createUnsecuredJwt(user);
}

/**
 * Creates an unsecured JWT (FOR dev purposes only)
 * @param auth
 */
export function createUnsecuredJwt(auth: object): string {
  // Unsecured JWTs use "none" as the algorithm.
  const header = {
    alg: "none",
    kid: "fakekid",
  };
  // Ensure that the auth payload has a value for 'iat'.
  (auth as any).iat = (auth as any).iat || 0;
  // Use `uid` field as a backup when `sub` is missing.
  (auth as any).sub = (auth as any).sub || (auth as any).uid;
  if (!(auth as any).sub) {
    throw new Error("auth must be an object with a 'sub' or 'uid' field");
  }
  // Unsecured JWTs use the empty string as a signature.
  const signature = "";
  return [
    util.base64.encodeString(JSON.stringify(header), /*webSafe=*/ false),
    util.base64.encodeString(JSON.stringify(auth), /*webSafe=*/ false),
    signature,
  ].join(".");
}
