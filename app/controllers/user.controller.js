const
  { users: User } = require('../models')
  , { sign } = require('jsonwebtoken')
  , { PRIVATE_KEY } = require("../config/auth.config.js")
  , Password = require("./../utils/Password.js")

exports.createUser = async ({ body }, response) => {
  const
    { firstName, lastName, email, password: passFromBody } = body

  try {
    const
      hash = Password.toHash(passFromBody)
      , user = await User.create({ firstName, lastName, email, password: hash })
    return response.json(user)
  } catch (error) {
    console.log(`>> Error al crear el usuario`, error)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

exports.findUserById = async ({ params }, response) => {
  try {
    const
      { id } = params
      , user = await User.scope("includeBootcamps").findByPk(id)
    if (!user) return response
      .status(404)
      .json({ error: `User(${id}) no encontrado` })

    return response.json(user)
  } catch (error) {
    console.log(`>> Error mientras se encontraba los usuarios: ${error}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

exports.findAll = async (_, response) => {
  try {
    const users = await User.scope("includeBootcamps").findAll()
    return response.json(users)
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

exports.updateUserById = async ({ body, params }, response) => {
  try {
    const
      { id } = params
      , user = await User.findByPk(id)
    if (!user) return response
      .status(404)
      .json({ error: `User(${id}) no encontrado` })

    const { firstName, lastName } = body
    await user.update({ firstName, lastName })
    return response.json(user)
  } catch (error) {
    console.log(`>> Error mientras se actualizaba el usuario: ${error}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

exports.deleteUserById = async ({ params }, response) => {
  try {
    const
      { id } = params
      , user = await User.findByPk(id)
    if (!user) return response
      .status(404)
      .json({ error: `User(${id}) no encontrado` })

    await user.destroy()
    return response.json(user)
  } catch (error) {
    console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

exports.signIn = async ({ body }, response) => {
  const { email, password: passFromBody } = body
  try {
    const user = await User.findOne({
      raw: true,
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    if (!user) return response
      .status(404)
      .json({ error: `User(${id}) no encontrado` })

    const { password, ...infoUser } = user
    if (!Password.compare(passFromBody, password)) return response
      .status(400)
      .json({ error: `password incorrecta` })

    const accessToken = sign(infoUser, PRIVATE_KEY)
    return response.json({ ...infoUser, accessToken })
  } catch (error) {
    return response.status(400).json({ error: error?.message ?? error })
  }
}