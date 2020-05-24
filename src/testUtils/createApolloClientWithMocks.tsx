import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";

export default function createApolloClientWithMocks(context) {
  return new ApolloClient({
    cache: new InMemoryCache({
      dataIdFromObject: (object) => object.id,
    }),
  });
}
