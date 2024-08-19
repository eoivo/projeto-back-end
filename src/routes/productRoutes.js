const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middleware/authMiddleware');


router.get('/v1/products', productController.getAllProducts);


router.post('/v1/products', authenticate, productController.createProduct);
router.put('/v1/products/:id', authenticate, productController.updateProduct);
router.delete('/v1/products/:id', authenticate, productController.deleteProduct);

module.exports = router;