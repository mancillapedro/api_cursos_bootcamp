const db = require('../models')
const User = db.users

// Crear y Guardar Usuarios
exports.createUser = async ({ body }, response) => {
  const { firstName, lastName, email } = body
  try {
    const user = await User.create({ firstName, lastName, email })
    return response.json(user)
  } catch (error) {
    console.log(`>> Error al crear el usuario ${err}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

// obtener los bootcamp de un usuario
exports.findUserById = async ({ params }, response) => {
  const { id } = params
  try {
    const user = await User.scope("includeBootcamps").findByPk(id)
    if (!user) return response
      .status(404)
      .json({ error: `User(${id}) no encontrado` })

    return response.json(user)
  } catch (error) {
    console.log(`>> Error mientras se encontraba los usuarios: ${error}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = async (_, response) => {
  try {
    const users = await User.scope("includeBootcamps").findAll()
    return response.json(users)
  } catch (error) {
    console.log(error)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

// Actualizar usuarios
exports.updateUserById = async ({ body, params }, response) => {
  const
    { id } = params,
    { firstName, lastName } = body
  try {
    const user = await User.findByPk(id)
    if (!user) return response
      .status(404)
      .json({ error: `User(${id}) no encontrado` })

    await user.update({ firstName, lastName })
    return response.json(user)
  } catch (error) {
    console.log(`>> Error mientras se actualizaba el usuario: ${error}`)
    return response.status(400).json({ error: error?.message ?? error })
  }

}

// Actualizar usuarios
exports.deleteUserById = async ({ params }, response) => {
  const { id } = params
  try {
    const user = await User.findByPk(id)
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