import { applySessionToken } from "lib/firebase/auth";
import { execute, makePromise } from "apollo-link";
import { ApolloClient, HttpLink, concat } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import { patchRequestWithToken } from "./patchRequestWithToken";
import { setContext } from "@apollo/link-context";

const authzLink = setContext(async (operation, prevContext) => {
  return patchRequestWithToken();
});

const httpLink = new HttpLink({ uri: process.env.VITE_APP_GRAPHQL_API as string });

const cache = new InMemoryCache();

const client: any = new ApolloClient({
  cache,
  link: concat(authzLink, httpLink),
});

export async function graphQLFetch(operation) {
  await applySessionToken();
  operation.query = gql(operation.query);
  return makePromise(execute(client.link, operation));
}

if (process.env.DEV) {
  (window as any).client = client;
}

export default client;
