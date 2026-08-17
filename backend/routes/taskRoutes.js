const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route: /api/tasks
router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);

// Route: /api/tasks/:id
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
