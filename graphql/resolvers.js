import bcrypt from "bcrypt"

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
    checkUsername: async (_, { username }) => {
      const user = await User.findOne({ username })
      if (user) return false
      return true
    },
    checkEmail: async (_, { email }) => {
      const user = await User.findOne({ email })
      if (user) return false
      return true
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
    updateFoodLiked: async (_, { _id, liked }) => {
      const food = await Food.findById(_id)
      if (food.liked.includes(liked)) {
        await Food.findOneAndUpdate({ _id }, { $pull: { liked: liked } }, { new: true })
      } else {
        await Food.findOneAndUpdate({ _id }, { $push: { liked: liked } }, { new: true })
      }
      return await Food.find()
    },
    updateFoodReview: async (_, { _id, userid, username, date, post, star }) => {
      const food = await Food.findById(_id)
      await Food.findOneAndUpdate(
        { _id },
        {
          sumStar: food.sumStar + star,
          $push: { review: { userid, username, date, post, star } },
        },
        { new: true },
      )
      return await Food.find()
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

    signup: async (_, { username, email, password }) => {
      const checkUser = (await User.findOne({ username })) || (await User.findOne({ email }))
      if (checkUser) return false

      bcrypt.hash(password, 10, async (err, passwordHash) => {
        const newUser = {
          username,
          email,
          passwordHash,
          role: 0,
          myliked: [],
          myreview: [],
        }
        await User.create(newUser)
      })

      return true
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) return null
      if (!bcrypt.compareSync(password, user.passwordHash)) return null

      return user
    },
    logout: async (_, { _id }) => {
      const user = await User.findById(_id)
      if (!user) return false
      return true
    },
    updateUserLiked: async (_, { _id, input }) => {
      const user = await User.findById(_id)
      if (user.myliked.includes(input.myliked)) {
        return await User.findOneAndUpdate({ _id }, { $pull: input }, { new: true })
      }
      return await User.findOneAndUpdate({ _id }, { $push: input }, { new: true })
    },
    updateUserReview: async (_, { _id, input }) => {
      const user = await User.findById(_id)
      if (user.myreview.includes(input.myreview)) {
        return null
      }
      return await User.findOneAndUpdate({ _id }, { $push: input }, { new: true })
    },
  },
}

export default resolvers
