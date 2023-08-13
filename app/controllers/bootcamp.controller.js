const
  db = require('../models'),
  Bootcamp = db.bootcamps,
  User = db.users

// Crear y guardar un nuevo bootcamp
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

// Agregar un Usuario al Bootcamp
exports.addUser = async ({ body }, response) => {
  const
    error = [],
    { bootcampId, userId } = body
  try {
    const
      bootcamp = await Bootcamp.findByPk(bootcampId),
      user = await User.findByPk(userId)

    !bootcamp && error.push(`Bootcamp(${bootcampId}) no encontrado`);
    !user && error.push(`User(${bootcampId}) no encontrado`);

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

// obtener los bootcamp por id 
exports.findById = async ({ params }, response) => {
  const id = params.id
  try {
    const bootcamp = await Bootcamp.scope('includeUsers').findByPk(id)

    if (!bootcamp) return response
      .status(404)
      .json({ error: `Bootcamp(${id}) no encontrado` });

    return response.json(bootcamp)
  } catch (error) {
    console.log(`>> Error mientras se encontraba el bootcamp: ${err}`)
    return response.status(400).json({ error: error?.message ?? error })
  }
}

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = async (_, response) => {
  try {
    const bootcamps = await Bootcamp.scope('includeUsers').findAll()
    return response.json(bootcamps)
  } catch (error) {
    console.log(">> Error Buscando los Bootcamps: ", error);
    return response.status(400).json({ error: error?.message ?? error })
  }
}