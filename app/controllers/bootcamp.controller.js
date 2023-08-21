const { bootcamps: Bootcamp, users: User } = require('../models')

exports.createBootcamp = async ({ body }, response) => {
  const { title, cue, description } = body
  try {
    const bootcamp = await Bootcamp.create({ title, cue, description })
    return response.json(bootcamp)
  } catch (error) {
    console.log(`>> Error al crear el bootcamp: ${error}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

exports.addUser = async ({ body, _user }, response) => {
  const
    error = [],
    { bootcampId, userId } = body

  if (userId != _user.id) return response
    .status(400)
    .json({ error: `solo puede registrase mismo User logueado a Bootcamp` })

  try {
    const
      bootcamp = await Bootcamp.findByPk(bootcampId)
      , user = await User.findByPk(userId)

    !bootcamp && error.push(`Bootcamp(${bootcampId}) no encontrado`);
    !user && error.push(`User(${userId}) no encontrado`);

    if (error.length) return response
      .status(404)
      .json({ error: `Bootcamp(${bootcampId}) no encontrado` });

    await bootcamp.addUser(user)
    return response.json(bootcamp)
  } catch (error) {
    console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", error)
    return response.status(400).json({ error: error?.message ?? error })
  }
};

exports.findById = async ({ params, _user }, response) => {
  const id = params.id
  try {
    const bootcamp = await Bootcamp.scope('includeUsers').findByPk(id)

    if (!bootcamp) return response
      .status(404)
      .json({ error: `Bootcamp(${id}) no encontrado` });

    if (!bootcamp.users.some(user => user.id == _user.id)) return response
      .status(400).json({ error: 'No puedes ver Bootcamp al cual no estas registrad@' })

    return response.json(bootcamp)
  } catch (error) {
    console.log(`>> Error mientras se encontraba el bootcamp: ${error}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

exports.findAll = async (_, response) => {
  try {
    const bootcamps = await Bootcamp.scope('includeUsers').findAll()
    return response.json(bootcamps)
  } catch (error) {
    console.log(">> Error Buscando los Bootcamps: ", error);
    return response.status(400).json({ error: error?.message ?? error })
  }
}