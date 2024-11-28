const jwt = require('jsonwebtoken');
function generateToken(user){
    const token = jwt.sign(user.email, process.env.JWT_KEY);
    return token;
}

module.exports.generateToken = generateToken;

