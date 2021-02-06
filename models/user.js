import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema({
  nickName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
})

export const User = model("User", userSchema)
