const express = require('express');
const router = express.Router();

const controller = require('../controllers/libros.controller');

//get listado libros
router.get('/', controller.index);

//get libro
router.get('/', controller.show);

//post libro
router.post('/', controller.store);

//put libro
router.put('/', controller.update);

//delete libro
router.delete('/', controller.destroy);