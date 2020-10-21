import user from "./userResolver";

export default {
  Query: {
    ...user.Query,
  },
  Mutation: {
    ...user.Mutation,
  },
};
