import { ApolloServer } from "apollo-server"
import typeDefs from "./graphql/schema"
import resolvers from "./graphql/resolvers"
import context from "./graphql/context"

import dbConnect from "./models"
dbConnect()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: true,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
