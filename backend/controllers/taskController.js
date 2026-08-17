const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Update a task (e.g., toggle completion)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = completed;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
