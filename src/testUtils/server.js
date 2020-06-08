// src/server.js
import { Server, Model } from "miragejs";
import { buildSchema, graphql } from "graphql";

let graphqlSchema = buildSchema(`
  type Query {
    movies: [Movie]
  }
  type Movie {
    id: ID!
    title: String!
  }
`);

export function makeServer({ environment = "development" } = {}) {
  console.log("i did make the server");
  let server = new Server({
    environment,
    seeds(server) {
      server.create("user", { name: "Bob" });
      server.create("user", { name: "Alice" });
    },

    routes() {
      console.log(" i did call this");

      this.passthrough((req) => {
        console.log(`cypress`, req.url);
        return false;
      });

      this.post("http://localhost:4000/graphql", (schema, request) => {
        let requestJson = JSON.parse(request.requestBody);
        let query = requestJson.query;
        let variables = requestJson.variables;

        let resolver = {
          movies() {
            return schema.db.movies;
          },
        };

        console.log(schema, request);

        return graphql(graphqlSchema, query, resolver, null, variables);
      });
    },
  });

  return server;
}
