const
  { verify } = require("jsonwebtoken")
  , { PRIVATE_KEY } = require("../config/auth.config.js")
  , { users: User } = require('./../models/index.js')
  , verifyToken = async (request, response, next) => {
    try {
      const token = request.headers.authorization
      verify(token, PRIVATE_KEY, async (tokenError, decoded) => {
        if (tokenError) return response.status(400).json({ error: tokenError });

        const
          { id, email } = decoded
          , user = await User.findOne({
            where: { id, email }, raw: true, attributes: ['id', 'email']
          })
        if (!user) return response.status(400).json({ error: `token invalido` });

        request._user = user
        next()
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error: error?.message ?? error })
    }
  }

module.exports = { verifyToken }