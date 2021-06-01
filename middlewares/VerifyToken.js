const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse')

function verifyToken(req, res, next) {
  console.log('POZ');
  let token = req.cookies.auth
  if (!token)
    return new ErrorResponse('No Token Provided', 403)
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return new ErrorResponse('Failed to Authenticate', 500)
    // if everything is good, save to request for use in other routes
    req.id = decoded.id;
    next();
  });
}

module.exports = verifyToken;