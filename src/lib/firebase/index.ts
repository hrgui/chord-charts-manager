import firebase from "firebase/app";
import "firebase/auth";

if (process.env.DEV) {
  (window as any).firebase = firebase;
}

export default function (firebaseConfig) {
  return firebase.initializeApp(firebaseConfig);
}
