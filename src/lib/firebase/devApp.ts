import * as util from "@firebase/util";
import * as firebase from "firebase/app";
import { Component } from "@firebase/component";

export const DEV_USER = {
  uid: "2k91lnHF0QZZq2DKi42REFTrtYo2",
  displayName: "Harman Goei",
  currentGroupId: "-Lcx_mv4C7-0WEWt3Mue",
  role: "admin"
};

function createUnsecuredJwt(auth: object): string {
  // Unsecured JWTs use "none" as the algorithm.
  const header = {
    alg: "none",
    kid: "fakekid"
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
    signature
  ].join(".");
}

export function runAsDev() {
  const app = firebase.initializeApp(
    { projectId: "iwc-worship" },
    "iwc-worship_dev"
  );

  const accessToken = createUnsecuredJwt(DEV_USER);

  //@ts-ignore
  const mockAuthComponent = new Component<any>(
    "auth-internal",
    () =>
      ({
        getToken: async () => ({ accessToken: accessToken }),
        getUid: () => null,
        addAuthTokenListener: listener => {
          // Call listener once immediately with predefined accessToken.
          listener(accessToken);
        },
        removeAuthTokenListener: () => {}
      } as any),
    "PRIVATE"
  );

  (app as any)._addOrOverwriteComponent(mockAuthComponent);

  return app;
}

export function getDbSettings() {
  return {
    host: "localhost:8080",
    ssl: false
  };
}

window.firebase = firebase;
