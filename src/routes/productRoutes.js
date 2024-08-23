const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.post('/v1/products', productController.createProduct);


router.get('/v1/products', productController.getAllProducts);


router.put('/v1/products/:id', productController.updateProduct);


router.delete('/v1/products/:id', productController.deleteProduct);

module.exports = router;
