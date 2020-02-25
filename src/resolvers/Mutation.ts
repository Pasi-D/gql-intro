import axios from "axios";
import { PubSub } from "apollo-server-express";
import { generateRandomId, createNewToken, hashPwd, getUserId, validatePassword } from "util/adapter";

import accessEnv from "config/accessEnv";

const POST_ADDED = "POST_ADDED";

const pubsub = new PubSub();

const signup = async (parent, args, context, info): any => {
  const { password, firstName, lastName } = args;

  const hashedPwd = await hashPwd(password);

  const newUser = {
    id: generateRandomId(),
    name: {
      first: firstName,
      last: lastName,
    },
    password: hashedPwd,
  };

  const user = (await axios.post(`http://localhost:${accessEnv("DATAPORT", 3000)}/users`, newUser)).data;

  const token = createNewToken(user);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context, info): any => {
  const users = (await axios.get(`http://localhost:${accessEnv("DATAPORT", 3000)}/users`)).data.filter(
    user => user.name.first === args.firstName && user.name.last === args.lastName,
  );

  if (!(users.length > 0)) {
    throw new Error("No such user found");
  }

  const user = users[0];

  const validPassword = await validatePassword(args.password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = createNewToken(user);

  return {
    token,
    user,
  };
};

const post = async (parent, args, context, info): any => {
  const userId = getUserId(context);

  const postData = {
    id: generateRandomId(),
    title: args.title,
    content: args.content,
    authorId: userId,
  };

  const post = (await axios.post(`http://localhost:${accessEnv("DATAPORT", 3000)}/posts`, postData)).data;
  pubsub.publish(POST_ADDED, { newPost: post });
  return post;
};

module.exports = {
  signup,
  login,
  post,
};
