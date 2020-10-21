import config from "../config";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authentication = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  } else {
    const data = await jwt.verify(token.split(" ")[1], config.SECRET);
    if (data) {
      const user = await User.findOne({ _id: data._id }, { password: 0 });
      return user;
    } else {
      throw new Error("Invalid token");
    }
  }
};
