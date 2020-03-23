import { ApolloClient } from "@apollo/client";
import ExtSchemaLink from "app/graphql/schema/ExtSchemaLink";
import { InMemoryCache } from "@apollo/client";
import schema from "app/graphql/schema/schema";

export default function createApolloClientWithMocks(context) {
  return new ApolloClient({
    cache: new InMemoryCache({
      dataIdFromObject: object => object.id
    }),
    link: new ExtSchemaLink({
      schema,
      context
    })
  });
}
