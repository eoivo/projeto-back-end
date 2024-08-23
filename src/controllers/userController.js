const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 


const createUser = async (req, res) => {
  const { firstname, surname, email, password } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await User.create({ firstname, surname, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, surname, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

   
    user.firstname = firstname || user.firstname;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    
    if (password) {
      
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
};


const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter usuário' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
 
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

   
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
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
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  login,
  getProfile,
  deleteUser,
  updateUser,
};
