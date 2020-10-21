import { gql, makeExecutableSchema } from "apollo-server-express";
import resolvers from "../resolvers";
import { UserTypes } from "./userTypes";

const typeDefs = gql`
  scalar Date

  # INPUT TYPES

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, UserTypes],
  resolvers,
});

export default typeDefs;
