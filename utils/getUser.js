import config from "../config";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const getUser = async (token) => {
  if (token) {
    const data = await jwt.verify(token, config.SECRET);
    if (data) {
      const user = await User.findOne({ _id: data._id }, { password: 0 });
      return user;
    } else return null;
  } else {
    return;
  }
};
