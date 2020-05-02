/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const {verifyToken} = require('../config/jwt');

module.exports = (req, res, next) => {
  const user = req.body;
  const token = req.headers.authorization;

  if(token && verifyToken(user, token)){
    next();
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
