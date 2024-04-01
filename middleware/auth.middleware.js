const jwt = require('jsonwebtoken');
function userAuthentication(req, res, next) {
  const bearerToken = req.headers['authorization'];
  if (!bearerToken) {
    res.send('token not found');
  }
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, 'secret key', (err, decode) => {
    if (err) {
      res.send('token is not valid');
    }

    req.user = decode;
    next();
  })
}

module.exports = { userAuthentication }