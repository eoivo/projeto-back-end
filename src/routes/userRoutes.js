const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');


router.post('/v1/users', userController.createUser);


router.get('/v1/users', userController.getAllUsers);


router.get('/v1/users/:id', userController.getUserById);


router.post('/v1/users/token', authController.generateToken);


router.get('/v1/users/profile', authenticate, authController.getProfile);


router.delete('/v1/users/:id', userController.deleteUser);


router.put('/v1/users/:id', userController.updateUser);

module.exports = router;
