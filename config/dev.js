import dotenv from "dotenv"

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env

module.exports = {
  mongoURI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cstoreserver.u8r0r.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
}
