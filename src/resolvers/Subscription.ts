import { PubSub } from "apollo-server-express";

const POST_ADDED = "POST_ADDED";

const pubsub = new PubSub();

const newPost = {
  subscribe: (): any => pubsub.asyncIterator([POST_ADDED]),
};

module.exports = {
  newPost,
};
