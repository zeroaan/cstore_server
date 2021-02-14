import { User } from "../models/user"

const context = async ({ req }) => {
  const token = req.headers.authorization || ""

  if (token.length != 64) return { user: null }

  const user = await User.find((user) => user.token === token)
  return { user }
}

export default context
