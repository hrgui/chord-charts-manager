import * as firebase from "firebase/app";
import "firebase/firestore";

import { runAsDev, getDbSettings } from "../devApp";

const app = runAsDev();
const db = app.firestore();
db.settings(getDbSettings());
(window as any).db = db;

(window as any)._db = {
  firestoreCreate,
  firestoreDelete,
  firestoreGet,
  firestoreList
};

// TODO: no patch
export async function firestoreUpdate(collectionName, docID, data) {
  const before = await firestoreGet(collectionName, docID);
  data = { ...before, ...data };
  await db
    .collection(collectionName)
    .doc(docID)
    .set(data);
  return { id: docID, ...data };
}

export function firestoreDelete(collectionName, docID) {
  return db
    .collection(collectionName)
    .doc(docID)
    .delete();
}

export async function firestoreCreate(collectionName, data) {
  const res = await db.collection(collectionName).add(data);

  return { id: res.id, ...data };
}

export async function firestoreGet(collectionName, docID) {
  const queryDocumentSnapshot = await db
    .collection(collectionName)
    .doc(docID)
    .get();
  return { id: docID, ...queryDocumentSnapshot.data() };
}

export async function firestoreList(collectionName, queryFn = z => z) {
  const collection = db.collection(collectionName);
  const queryDocumentSnapshot = await queryFn(collection).get();
  return queryDocumentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

function gqlArgsToFirestoreWhereClauses({ order_by, id, ...args }, collection) {
  Object.keys(args).forEach(key => {
    //TODO support for <, <=, ==, >, >=, array-contains, in, or array-contains-any
    console.log(key, args[key]);
    collection = collection.where(key, "==", args[key]);
  });

  if (order_by) {
    collection = collection.orderBy(
      order_by.slice(1),
      order_by[0] === "+" ? "asc" : "desc"
    );
  }

  return collection;
}

//TODO: remove when the UI knows how to deal with this
function updateAuthz(data) {
  if (data.share) {
    const readers: String[] = [];
    const editors: String[] = [];
    Object.keys(data.share).forEach(id => {
      readers.push(id);

      if (data.share[id] === "editor") {
        editors.push(id);
      }
    });

    data.authz = {
      readers: [...readers],
      editors: [...editors]
    };

    if (data.owner_uid) {
      data.authz.readers.push(data.owner_uid);
      data.authz.editors.push(data.owner_uid);
    }
  }

  return data;
}

export class FirestoreCRUDClient {
  collectionName: string;
  db: firebase.firestore.Firestore;
  defaultListFilterFn: any;

  constructor(collectionName) {
    this.collectionName = collectionName;
    this.db = db;
  }

  listFilter(collection, args, user) {
    return gqlArgsToFirestoreWhereClauses(args, collection);
  }

  get(docID) {
    return firestoreGet(this.collectionName, docID);
  }

  list({ args, user }) {
    return firestoreList(this.collectionName, collection =>
      this.listFilter(collection, args, user)
    );
  }

  create(data) {
    data = updateAuthz(data);
    return firestoreCreate(this.collectionName, data);
  }

  update(docID, data) {
    data = updateAuthz(data);
    return firestoreUpdate(this.collectionName, docID, data);
  }

  delete(docID) {
    return firestoreDelete(this.collectionName, docID);
  }
}

export default FirestoreCRUDClient;
