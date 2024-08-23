const Category = require('../models/Category');

const createCategory = async (req, res) => {
  const { name, slug, use_in_menu } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: 'Nome e slug são obrigatórios' });
  }

  try {
    const newCategory = await Category.create({ name, slug, use_in_menu });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categoria' });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, use_in_menu } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: 'Nome e slug são obrigatórios' });
  }

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await category.update({ name, slug, use_in_menu });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
