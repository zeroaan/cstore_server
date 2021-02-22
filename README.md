# Server - 편리 (편의점 리뷰)

### Query

```graphql
type Query {
  foods: [Food]
  getFood(_id: ID!): Food
  notices: [Notice]
  users: [User]
  me(_id: ID!): User
  checkUsername(username: String!): Boolean!
  checkEmail(email: String!): Boolean!
}
```

<br />

### Mutation

```graphql
type Mutation {
  createFood(input: CreateFoodInput): Food
  updateFood(_id: ID!, input: UpdateFoodInput): Food
  deleteFood(_id: ID!): Food
  updateFoodLiked(_id: ID!, liked: String!): [Food]
  updateFoodReview(_id: ID!, userid: String!, username: String!, date: String!, post: String!, star: Float!): [Food]
  createNotice(input: CreateNoticeInput): Notice
  updateNotice(_id: ID!, input: CreateNoticeInput): Notice
  deleteNotice(_id: ID!): Notice
  signup(username: String!, email: String!, password: String!): Boolean!
  login(email: String!, password: String!): User
  logout(_id: ID!): Boolean!
  updateUserLiked(_id: ID!, input: UpdateUserLikedInput): User
  updateUserReview(_id: ID!, input: UpdateUserReviewInput): User
}
```

<br />

### Food

```graphql
type Food {
  _id: ID!
  name: String!
  fullName: String!
  price: String!
  sumStar: Float!
  image: String!
  liked: [String]!
  review: [Review]!
  category: String!
}
```

<br />

### Review

```graphql
type Review {
  _id: ID!
  userid: String!
  username: String!
  date: String!
  post: String!
  star: Float!
}
```

<br />

### User

```graphql
type User {
  _id: ID!
  username: String!
  email: String!
  passwordHash: String!
  role: Int!
  myliked: [String]!
  myreview: [String]!
}
```
