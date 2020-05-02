const jwt = require('jsonwebtoken');
const {jwtSecret, jwtPublic} = require('../config/secret.js');

function generateToken(user){

    const payload = {}
    payload.subject = user.id;
    payload.username = user.username;
    payload.department = user.department;

    const options = {};
    options.issuer = 'Nathans Software';
    options.subject = user.username;
    options.audience = 'NathanSofware.com';
    options.expiresIn = '24h';
    options.algorithm = 'RS256';

    return jwt.sign(payload, jwtSecret, options);
}

function verifyToken(user, token){

    const verifyOptions = {}
    verifyOptions.issuer = 'Nathans Software';
    verifyOptions.subject = user.username;
    verifyOptions.audience = 'NathanSofware.com';
    verifyOptions.expiresIn = '24h';
    verifyOptions.algorithm = ["RS256"];

    return jwt.verify(token, jwtPublic, verifyOptions);
}

module.exports = {
    generateToken,
    verifyToken
}