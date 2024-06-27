const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const middleware = require('../middelewares/auth.middleware');

router.post('/register', controller.register);
router.post('/login', controller.login);

router.get('/protected', middleware, (req, res) => {
    res.json({ userID: req.userId });
});

module.exports = router;