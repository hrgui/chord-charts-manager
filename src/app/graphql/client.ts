import { applySessionToken } from "lib/firebase/auth";
import { execute, makePromise } from "apollo-link";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.id,
});

const client: any = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
  cache,
});

export async function graphQLFetch(operation) {
  await applySessionToken();
  operation.query = gql(operation.query);
  return makePromise(execute(client.link, operation));
}

if (process.env.NODE_ENV !== "production") {
  (window as any).client = client;
}

export default client;
