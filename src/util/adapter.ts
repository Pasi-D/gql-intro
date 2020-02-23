import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

import accessEnv from "config/accessEnv";

const APP_SECRET = accessEnv("APP_SECRET");

export const generateRandomId = (): string => uuid();

export const getUserId = (context: any): string => {
  // context.req works in case of apollo-server
  const Authorization = context.req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
};

export const hashPwd = (plainPwd: string): any => {
  return bcrypt.hash(plainPwd, 10);
};

export const validatePassword = (password: string, hash: any): any => {
  return bcrypt.compare(password, hash);
};

export const createNewToken = (user: any): any => {
  return jwt.sign({ userId: user.id }, APP_SECRET);
};
