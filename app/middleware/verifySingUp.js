const
  { users: User } = require('./../models/index.js')
  , verifySingUp = async ({ body }, response, next) => {
    try {
      const
        { email } = body
        , user = await User.findOne({ where: { email } })

      if (user) return response
        .status(400)
        .json({ error: `el correo ya se encuentra ingresado` });

      next()
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error: error?.message ?? error })
    }
  }

module.exports = { verifySingUp }