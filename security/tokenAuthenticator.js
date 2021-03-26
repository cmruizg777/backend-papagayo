const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
        res.status(403);
        return res.send(err);
    }
    req.user = user
    next()
  })
}

generateAccessToken = (user) => {
    //duracion del token 5 min
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '300s' });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}