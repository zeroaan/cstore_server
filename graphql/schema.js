import { gql } from "apollo-server"

const typeDefs = gql`
  type Review {
    _id: ID!
    userid: String!
    username: String!
    date: String!
    post: String!
    star: Float!
  }
  type Food {
    _id: ID!
    name: String!
    fullName: String!
    price: String!
    image: String!
    liked: [String]!
    review: [Review]!
  }
  type Notice {
    _id: ID!
    title: String!
    date: String!
    desc: String!
    image: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    passwordHash: String!
    role: Int!
    myliked: [String]!
    myreview: [String]!
  }
  type Query {
    foods: [Food]
    getFood(_id: ID!): Food

    notices: [Notice]

    users: [User]
    me(_id: ID!): User
    login(email: String!, password: String!): User
    logout(_id: ID!): Boolean!
  }

  input ReviewInput {
    userid: String
    username: String
    date: String
    post: String
    star: Float
  }
  input CreateFoodInput {
    name: String!
    fullName: String!
    price: String!
    image: String!
    liked: [String]! = []
    review: [ReviewInput]! = []
  }
  input UpdateFoodInput {
    name: String
    fullName: String
    price: String
    image: String
    liked: [String]
    review: [ReviewInput]
  }
  input UpdateLikedInput {
    liked: String
  }
  input UpdateReviewInput {
    review: ReviewInput
  }
  input CreateNoticeInput {
    title: String!
    date: String!
    desc: String!
    image: String!
  }
  input UpdateNoticeInput {
    title: String
    date: String
    desc: String
    image: String
  }
  type Mutation {
    createFood(input: CreateFoodInput): Food
    updateFood(_id: ID!, input: UpdateFoodInput): Food
    deleteFood(_id: ID!): Food
    updateLiked(_id: ID!, input: UpdateLikedInput): Food
    updateReview(_id: ID!, input: UpdateReviewInput): Food

    createNotice(input: CreateNoticeInput): Notice
    updateNotice(_id: ID!, input: CreateNoticeInput): Notice
    deleteNotice(_id: ID!): Notice

    signup(username: String!, email: String!, password: String!): Boolean!
  }
`

export default typeDefs
