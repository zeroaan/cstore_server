import { AuthenticationError } from "apollo-server"
import bcrypt from "bcrypt"
import sha256 from "crypto-js/sha256"
import rand from "csprng"
import mongoose from "mongoose"

import { Food } from "../models/food"
import { Notice } from "../models/notice"
import { User } from "../models/user"

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
    users: async () => {
      return await User.find()
    },
    me: async (_, { _id }) => {
      return await User.findById(_id)
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
      return await Food.findOneAndUpdate({ _id }, { $push: input }, { new: true })
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

    signup: async (_, { input: { username, email, password } }) => {
      const checkUser = (await User.findOne({ username })) || (await User.findOne({ email }))
      if (checkUser) return false

      bcrypt.hash(password, 10, async (err, passwordHash) => {
        const newUser = {
          username,
          email,
          passwordHash,
          role: 0,
          token: "",
        }
        await User.create(newUser)
      })

      return true
    },
    login: async (_, { input: { email, password } }) => {
      const user = await User.findOne({ email })

      if (!user) return null
      if (user.token) return null
      if (!bcrypt.compareSync(password, user.passwordHash)) return null

      user.token = sha256(rand(160, 36) + email + password).toString()
      await User.findOneAndUpdate({ _id: user._id }, user, { new: true })

      return user
    },
    logout: async (_, { _id }) => {
      const user = await User.findById(_id)

      if (!user) return false
      if (user.token === "") return false

      user.token = ""
      await User.findOneAndUpdate({ _id: user._id }, user, { new: true })
      return true
    },
  },
}

export default resolvers
