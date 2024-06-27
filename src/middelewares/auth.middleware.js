const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const { } = req.authHeader["authorize"]

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({ auth: false, message: "Malfor..."});

    }
}