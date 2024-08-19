const jwt = require('jsonwebtoken');
const { User } = require('../models/User');


const generateToken = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    throw new Error('Email ou senha inválidos');
  }

  const token = jwt.sign({ id: user.id }, 'seu_segredo_aqui', { expiresIn: '1h' });
  return token;
};


module.exports = {
  generateToken,
};
