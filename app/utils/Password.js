const
  bcrypt = require('bcrypt')
  , SALT_ROUNDS = 10

class Password {
  static #passToString(pass) { return String(pass ?? '').trim() }
  static #validated(pass) {
    const
      textError = 'password debe tener mínimo 8 caracteres'
      , passToString = Password.#passToString(pass)
    if (passToString.length < 8) throw new Error(textError)
    return passToString
  }
  static compare(pass, hash) {
    return bcrypt.compareSync(Password.#validated(pass), hash)
  }
  static toHash(pass) {
    return bcrypt.hashSync(Password.#validated(pass), SALT_ROUNDS)
  }
}

module.exports = Password