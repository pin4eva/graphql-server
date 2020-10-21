import { gql } from "apollo-server-express";

export const UserTypes = gql`
  type User {
    _id: ID
    name: String
    email: String
    position: String
    phone: String
    address: String

    role: String
    isActive: Boolean
    image: String
  }

  type Token {
    token: String
    user: User
  }

  extend type Query {
    # Users Query
    getUsers: [User]
    me(token: String): User
    auth: User
    getUser(_id: ID): User
  }

  extend type Mutation {
    # User Mutations
    signup(input: SignupInput): User
    login(email: String, password: String): Token
    updateUser(input: UserInput): User
    deleteUser(_id: ID): User
    verify(token: String): User
    forgotPassword(token: String, password: String): User
    changePassword(_id: ID, password: String): User
    checkEmail(email: String): User
    changeRole(_id: ID!, role: String!): User

    setTarget(target: Int, _id: ID): User
  }

  input UserInput {
    _id: ID
    name: String
    email: String
    password: String

    phone: String
    address: String
    state: String
    target: Int
    role: String
    position: String
    isActive: Boolean
    image: String
    probono: Boolean
    account_number: Int
    bank: String
    token: String
  }

  input SignupInput {
    _id: ID
    name: String
    email: String
    password: String
    position: String
  }
`;
