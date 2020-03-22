import FirestoreCRUDClient from "lib/firebase/firestore/crudClient";
import { isUserAdmin } from "./role";

export default class DefaultCollectionClient extends FirestoreCRUDClient {
  listFilter(collection, args, user) {
    const res = super.listFilter(collection, args, user);

    if (isUserAdmin(user)) {
      return res;
    }

    return res.where("authz.readers", "array-contains-any", [
      user.uid,
      user.currentGroupId
    ]);
  }
}
