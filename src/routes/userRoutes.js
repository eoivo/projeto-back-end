const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');


router.post('/v1/user', userController.createUser);


router.get('/v1/users', userController.getAllUsers);


router.get('/v1/user/:id', userController.getUserById);


router.post('/v1/user/token', authController.generateToken);


router.get('/v1/user/profile', authenticate, authController.getProfile);

module.exports = router;
