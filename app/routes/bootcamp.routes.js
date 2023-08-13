const
    { Router } = require('express'),
    bootcampController = require('./../controllers/bootcamp.controller.js'),
    router = Router();

router.get('/', bootcampController.findAll)
router.get('/:id', bootcampController.findById)
router.post('/', bootcampController.createBootcamp)
router.post('/adduser', bootcampController.addUser)

module.exports = router

/**
 * GET /api/bootcamp Lista todos los bootcamp, acceso público
 * 
 * GET /api/bootcamp/:id Obtiene información de un bootcamp según id, y muestra los usuarios registrados en el bootcamp. Acceso por medio de token, previamente iniciado sesión
 * (el usuario pertenece al bootcamp? cualquier usuario registrado?)
 * 
 * POST /api/bootcamp Crea un bootcamp, acceso por medio de token, previamente iniciado sesión
 * 
 * POST /api/bootcamp/adduser Agrega usuarios previamente registrados al bootcamp, acceso por medio de token, previamente iniciado sesión
 * (el mismo usuario logeado?)
 */