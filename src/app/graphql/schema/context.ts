import FirestoreCRUDClient from "lib/firebase/firestore/crudClient";
import GroupClient from "./GroupClient";
import DefaultCollectionClient from "./DefaultCollectionClient";
import { DEV_USER } from "lib/firebase/devApp";

export default async () => {
  return {
    user: DEV_USER,
    api: {
      song: new DefaultCollectionClient("song"),
      setlist: new DefaultCollectionClient("setlist"),
      user: new FirestoreCRUDClient("user"),
      group: new GroupClient()
    }
  };
};
