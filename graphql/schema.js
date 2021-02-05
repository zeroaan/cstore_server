import { gql } from "apollo-server"

const typeDefs = gql`
  type Review {
    _id: ID!
    nickName: String!
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
    liked: Int!
    review: [Review]!
  }
  type Notice {
    _id: ID!
    title: String!
    date: String!
    desc: String!
    image: String!
  }
  type Query {
    foods: [Food]
    getFood(_id: ID!): Food
    notices: [Notice]
  }

  input ReviewInput {
    nickName: String
    date: String
    post: String
    star: Float
  }
  input CreateFoodInput {
    name: String!
    fullName: String!
    price: String!
    image: String!
    liked: Int! = 0
    review: [ReviewInput]! = []
  }
  input UpdateFoodInput {
    name: String
    fullName: String
    price: String
    image: String
    liked: Int
    review: [ReviewInput]
  }
  input CreateReviewInput {
    review: [ReviewInput]
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
    createReview(_id: ID!, input: CreateReviewInput): Food
    createNotice(input: CreateNoticeInput): Notice
    updateNotice(_id: ID!, input: CreateNoticeInput): Notice
    deleteNotice(_id: ID!): Notice
  }
`

export default typeDefs
