import mongoose from "mongoose"
const config = require("../config/key")

const MONGO_URI = config.mongoURI

module.exports = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected")
    })
    .catch((err) => {
      console.log(err)
    })
}
