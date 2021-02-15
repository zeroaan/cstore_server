import mongoose from "mongoose"

const { Schema, model } = mongoose

const reviewSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
})

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  liked: {
    type: [String],
    default: [],
  },
  review: {
    type: [reviewSchema],
    default: [],
  },
})

export const Food = model("Food", foodSchema)
