const router = require('./libros.router');

const controller = require('../controllers/usuarios.controller');

//traer usuario
router.get('/', controller.show);

//agregar usuario
router.post('/', controller.store);

//modificar usuario
router.put('/', controller.update);

//eliminar usuario (soft delete)
router.delete('/', controller.destroy);