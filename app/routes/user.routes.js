const
  { Router } = require('express')
  , router = Router()
  , userController = require('./../controllers/user.controller.js')
  , { verifySingUp, verifyToken, verifyIdentity } = require('./../middleware/index.js')

router.post('/signin', userController.signIn)
router.post('/signup', verifySingUp, userController.createUser)

router.get('/user', verifyToken, userController.findAll)
router.get('/user/:id', [verifyToken, verifyIdentity], userController.findUserById)
router.put('/user/:id', [verifyToken, verifyIdentity], userController.updateUserById)
router.delete('/user/:id', [verifyToken, verifyIdentity], userController.deleteUserById)

module.exports = router

/**
 * POST /api/signin Inicio de sesión en la API, acceso público
 * 
 * POST /api/signup Registro de una nuevo usuario, acceso público
 * 
 * GET /api/user/ Lista información de todos los usuarios y los Bootcamp registrados, acceso por medio de token, previamente iniciado sesión
 * 
 * GET /api/user/:id Lista información del usuario según id, acceso por medio de token, previamente iniciado sesión
 * (solo mismo usuario puede ver su info)  
 * 
 * PUT /api/user/:id Actualiza los campos de firstName y lastName de un usuario según su id, acceso por medio de token, previamente iniciado sesión
 * (solo mismo usuario puede actualizar)
 * 
 * DELETE /api/user/:id Elimina el usuario según id, acceso por medio de token, previamente iniciado sesión
 * (solo mismo usuario puede borrar)
 */