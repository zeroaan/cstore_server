import { User } from "../models/user"

const context = ({ req }) => {
  const token = req.headers.authorization || ""

  if (token.length != 64) return { user: null }

  const user = User.find((user) => user.token === token)
  return { user }
}

export default context
