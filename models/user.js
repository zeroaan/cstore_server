import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  myliked: {
    type: [String],
    default: [],
  },
  myreview: {
    type: [String],
    default: [],
  },
})

export const User = model("User", userSchema)
