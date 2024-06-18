const router = require('./usuarios.router');

const controller = require('../controllers/autenticacion.controller');

router.post('/', controller.autenticar);