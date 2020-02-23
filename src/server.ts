import "dotenv/config";
import App from "./app";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";

const Query = require("resolvers/Query");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = { Query };

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

const app = new App(server);

app.listen();
