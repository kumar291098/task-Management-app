// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);

// Admin only routes
router.get('/', authenticateToken, requireAdmin, userController.getAllUsers);
router.delete('/:userId', authenticateToken, requireAdmin, userController.deleteUser);

module.exports = router;