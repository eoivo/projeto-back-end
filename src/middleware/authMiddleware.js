const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  jwt.verify(token, 'seu_segredo_aqui', (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    req.user = user; 
    next();
  });
};

module.exports = authenticate;