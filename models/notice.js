import mongoose from "mongoose"

const { Schema, model } = mongoose

const noticeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})

export const Notice = model("Notice", noticeSchema)
