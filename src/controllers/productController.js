const Product = require('../models/Product');
const { ProductImage } = require('../models/ProductImage');
const { ProductOption } = require('../models/ProductOption');


const createProduct = async (req, res) => {
  const {
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    images,
    options,
  } = req.body;

  if (!name || !slug || !price) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  try {
    const newProduct = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
    });

   
    if (images && images.length > 0) {
      await Promise.all(images.map(image => ProductImage.create({
        product_id: newProduct.id,
        path: image,
      })));
    }

    
    if (options && options.length > 0) {
      await Promise.all(options.map(option => ProductOption.create({
        product_id: newProduct.id,
        ...option,
      })));
    }

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
};


const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const {
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
  } = req.body;

  if (!name || !slug || !price) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.update({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
};


const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro do Servidor Interno' });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts, 
};
