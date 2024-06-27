const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');

//traer usuario
router.get('/', controller.show);

//agregar usuario
router.post('/', controller.store);

//modificar usuario
router.put('/', controller.update);

//eliminar usuario (soft delete)
router.delete('/', controller.destroy);

module.exports = router;