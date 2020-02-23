import "dotenv/config";
import App from "./app";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";

const Query = require("resolvers/Query");
const User = require("resolvers/User");
const Post = require("resolvers/Post");

const typeDefs = gql`
  type Query {
    greetings: String
    """
    Gets all the users
    """
    getUsers: [User]
    """
    Retrieves users by id
    """
    getUser(id: ID): User
    """
    Gets all the posts
    """
    getPosts: [Post]
  }

  type User {
    id: ID!
    name: Name
    age: Int
    friends: [User!]!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String
    content: String
    authorId: String
    author: User!
  }

  type Name {
    first: String
    last: String
  }
`;

const resolvers = { Query, User, Post };

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

const app = new App(server);

app.listen();
