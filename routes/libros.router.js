const express = require('express');
const router = express.Router();

const controller = require('../controllers/libros.controller');

//mostrar listado libros
router.get('/', controller.index);

//mostrar libro
router.get('/', controller.show);

//agregar libro
router.post('/', controller.store);

//modificar libro
router.put('/', controller.update);

//eliminar libro
router.delete('/', controller.destroy);

module.exports = router;