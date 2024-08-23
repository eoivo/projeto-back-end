const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const generateToken = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Email ou senha inválidos');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = {
  generateToken,
};
