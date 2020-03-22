import { applySessionToken } from "lib/firebase/auth";
import { execute, makePromise } from "apollo-link";
import { ApolloClient } from "@apollo/client";
import ExtSchemaLink from "./schema/ExtSchemaLink";
import { InMemoryCache } from "@apollo/client";
import schema from "./schema/schema";
import { gql } from "@apollo/client";
import context from "./schema/context";

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
});

const client: any = new ApolloClient({
  cache,
  link: new ExtSchemaLink({
    schema,
    context
  })
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
