import mongoose from "mongoose"

const { Schema, model } = mongoose

const reviewSchema = new Schema({
  nickName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
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
    type: Number,
    required: true,
  },
  review: {
    type: [reviewSchema],
    required: true,
  },
})

export const Food = model("Food", foodSchema)
