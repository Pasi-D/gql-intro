import axios from "axios";

import accessEnv from "config/accessEnv";

const friends = (parent, args, context): any => {
  if (!parent.friends) {
    return [];
  }
  const promises = parent.friends.map(async user => {
    const response = await axios.get(`http://localhost:${accessEnv("DATAPORT", 3000)}/users/${user.id}`);
    return response.data;
  });

  return Promise.all(promises);
};

const posts = (parent, args, context): any => {
  if (!parent.posts) {
    return [];
  }
  const promises = parent.posts.map(async post => {
    const response = await axios.get(`http://localhost:${accessEnv("DATAPORT", 3000)}/posts/${post.id}`);
    return response.data;
  });

  return Promise.all(promises);
};

module.exports = {
  friends,
  posts,
};
