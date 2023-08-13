const { Router } = require('express')
const router = Router()

router.post('/signup', createUser)
// router.post('/signin',)
router.get('/user', findAll)
router.get('/user/:id', findUserById)
router.put('/user/:id', updateUserById)
router.delete('/user/:id', deleteUserById)

module.exports = router

/**
 * POST /api/signup Registro de una nuevo usuario, acceso público
 * POST /api/signin Inicio de sesión en la API, acceso público
 * GET /api/user/:id Lista información del usuario según id, acceso por medio de token, previamente iniciado sesión
 * GET /api/user/ Lista información de todos los usuarios y los Bootcamp registrados, acceso por medio de token, previamente iniciado sesión
 * PUT /api/user/:id Actualiza los campos de firstName y lastName de un usuario según su id, acceso por medio de token, previamente iniciado sesión
 * DELETE /api/user/:id Elimina el usuario según id, acceso por medio de token, previamente iniciado sesión
 */