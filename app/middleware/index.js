const
  { verifyToken } = require('./auth.js')
  , { verifySingUp } = require('./verifySingUp.js')

const verifyIdentity = ({ params, _user }, response, next) => {
  if (params.id != _user.id) return response
    .status(400)
    .json({ error: `User(${_user.id}) logueado no coincide con User(${params.id})` });

  next()
}

module.exports = { verifySingUp, verifyToken, verifyIdentity }