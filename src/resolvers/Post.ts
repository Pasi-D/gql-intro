import axios from "axios";

import accessEnv from "config/accessEnv";

const author = (parent, args, context): any => {
  return axios.get(`http://localhost:${accessEnv("DATAPORT", 3000)}/users/${parent.authorId}`).then(res => res.data);
};

module.exports = {
  author,
};
