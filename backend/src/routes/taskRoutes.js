// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// Routes with optional authentication (for backward compatibility)
router.get('/', optionalAuth, taskController.getTasks);
router.get('/stats', authenticateToken, taskController.getTaskStats);
router.get('/:taskId', optionalAuth, taskController.getTask);

// Protected routes
router.post('/', authenticateToken, taskController.createTask);
router.put('/:taskId', authenticateToken, taskController.updateTask);
router.delete('/:taskId', authenticateToken, taskController.deleteTask);

module.exports = router;