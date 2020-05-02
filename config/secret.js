require('dotenv').config();

module.exports = {
    jwtSecret: JSON.parse(`"${process.env.JWT_SECRET}"`) || 'Secret',
    jwtPublic: JSON.parse(`"${process.env.JWT_PUBLIC}"`) || 't'
}