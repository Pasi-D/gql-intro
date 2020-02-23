import axios from "axios";

import accessEnv from "config/accessEnv";

const greetings = (): string => `Hello world`;

const getUsers = (): any => {
  return axios.get(`http://localhost:${accessEnv("DATAPORT", 3000)}/users`).then(res => res.data);
};

const getUser = (parent, args, context, info): any => {
  return axios.get(`http://localhost:${accessEnv("DATAPORT", 3000)}/users/${args.id}`).then(res => res.data);
};

const getPosts = (): any => {
  return axios.get(`http://localhost:${accessEnv("DATAPORT", 3000)}/posts`).then(res => res.data);
};

module.exports = {
  greetings,
  getUsers,
  getUser,
  getPosts,
};
