const
    { Router } = require('express'),
    router = Router(),
    userController = require('./../controllers/user.controller.js')

// router.post('/signin',)
router.post('/signup', userController.createUser)
router.get('/user', userController.findAll)
router.get('/user/:id', userController.findUserById)
router.delete('/user/:id', userController.deleteUserById)
router.put('/user/:id', userController.updateUserById)

module.exports = router

/**
 * POST /api/signup Registro de una nuevo usuario, acceso público
 * 
 * POST /api/signin Inicio de sesión en la API, acceso público
 * 
 * GET /api/user/ Lista información de todos los usuarios y los Bootcamp registrados, acceso por medio de token, previamente iniciado sesión
 * 
 * GET /api/user/:id Lista información del usuario según id, acceso por medio de token, previamente iniciado sesión
 * (solo mismo usuario puede ver su info?)
 * 
 * PUT /api/user/:id Actualiza los campos de firstName y lastName de un usuario según su id, acceso por medio de token, previamente iniciado sesión
 * (solo mismo usuario puede actualizar?)
 * 
 * DELETE /api/user/:id Elimina el usuario según id, acceso por medio de token, previamente iniciado sesión
 * (solo mismo usuario puede borrar?)
 */