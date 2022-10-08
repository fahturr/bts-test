const { validateToken, generateError } = require("../helpers");

exports.verifyUser = async (req, res, next) => {
    try {
        const bearerToken = req.headers["authorization"].split(" ");

        if (!req.headers['authorization']) throw generateError("Unauthorized", "unauthorized access");
        if (bearerToken[0] !== "Bearer") throw generateError("Unauthorized", "wrong token code");

        const token = bearerToken[1];

        req.data = await validateToken(token);

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};