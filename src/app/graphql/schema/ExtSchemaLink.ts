import { ApolloLink, Operation, FetchResult, Observable } from "apollo-link";
import { execute } from "graphql/execution/execute";
import { GraphQLSchema } from "graphql/type/schema";

export class SchemaLink extends ApolloLink {
  public schema: GraphQLSchema;
  public rootValue: any;
  public context: any;

  constructor({ schema, rootValue, context }: any) {
    super();

    this.schema = schema;
    this.rootValue = rootValue;
    this.context = context;
  }

  async _execute(operation) {
    const contextValue =
      typeof this.context === "function"
        ? await this.context(operation)
        : this.context;

    return execute(
      this.schema,
      operation.query,
      this.rootValue,
      contextValue,
      operation.variables,
      operation.operationName
    );
  }

  public request(operation: Operation): Observable<FetchResult> | null {
    return new Observable<FetchResult>(observer => {
      Promise.resolve(this._execute(operation))
        .then(data => {
          if (!observer.closed) {
            observer.next(data);
            observer.complete();
          }
        })
        .catch(error => {
          if (!observer.closed) {
            observer.error(error);
          }
        });
    });
  }
}

export default SchemaLink;
