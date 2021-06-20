import firebase from "firebase/app";
import "firebase/auth";

if (import.meta.env.DEV) {
  (window as any).firebase = firebase;
}

export default function (firebaseConfig) {
  return firebase.initializeApp(firebaseConfig);
}
