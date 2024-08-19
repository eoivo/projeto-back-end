const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticate = require('../middleware/authMiddleware');


router.post('/v1/category', authenticate, categoryController.createCategory);


router.get('/v1/categories', categoryController.getAllCategories);


router.get('/v1/category/:id', categoryController.getCategoryById);


router.put('/v1/category/:id', authenticate, categoryController.updateCategory);


router.delete('/v1/category/:id', authenticate, categoryController.deleteCategory);

module.exports = router;
