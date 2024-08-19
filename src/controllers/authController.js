const authService = require('../services/authService');  
const { User } = require('../models/User');

const generateToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
  
    const token = await authService.generateToken(email, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter perfil' });
  }
};

module.exports = {
  generateToken,
  getProfile,
};
