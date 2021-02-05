import { Food } from "../models/food"
import { Notice } from "../models/notice"

const resolvers = {
  Query: {
    foods: async () => {
      return await Food.find()
    },
    getFood: async (_, { _id }) => {
      return await Food.findById(_id)
    },
    notices: async () => {
      return await Notice.find()
    },
  },
  Mutation: {
    createFood: async (_, { input }) => {
      return await Food.create(input)
    },
    updateFood: async (_, { _id, input }) => {
      return await Food.findOneAndUpdate({ _id }, input, { new: true })
    },
    deleteFood: async (_, { _id }) => {
      return await Food.findOneAndDelete({ _id })
    },
    createReview: async (_, { _id, input }) => {
      return await Food.findOneAndUpdate(
        { _id },
        { $push: input },
        { new: true },
      )
    },
    createNotice: async (_, { input }) => {
      return await Notice.create(input)
    },
    updateNotice: async (_, { _id, input }) => {
      return await Notice.findOneAndUpdate({ _id }, input, { new: true })
    },
    deleteNotice: async (_, { _id }) => {
      return await Notice.findOneAndDelete({ _id })
    },
  },
}

export default resolvers
