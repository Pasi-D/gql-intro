import "dotenv/config";
import App from "./app";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";

const Query = require("resolvers/Query");
const Mutation = require("resolvers/Mutation");
const Subscription = require("resolvers/Subscription");
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

  type Mutation {
    """
    Signup Mutation to create a user
    """
    signup(firstName: String!, lastName: String!, password: String!): AuthPayload
    """
    Login Mutation
    """
    login(firstName: String!, lastName: String!, password: String!): AuthPayload
    """
    Publish a new post
    """
    post(title: String!, content: String!): Post
  }

  type Subscription {
    newPost: Post
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

  type AuthPayload {
    token: String
    user: User
  }
`;

const resolvers = { Query, Mutation, Subscription, User, Post };

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: (request): any => {
    return { ...request };
  },
});

const app = new App(server);

app.listen();
