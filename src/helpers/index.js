const jwt = require("jsonwebtoken"),
    bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
};

exports.verifyPassword = async (password, hash) =>
    bcrypt.compareSync(password, hash);

exports.generateToken = async (id) =>
    jwt.sign(id, process.env.JWT_KEY, { expiresIn: '1h' });

exports.validateToken = async (token) =>
    jwt.verify(token, process.env.JWT_KEY);