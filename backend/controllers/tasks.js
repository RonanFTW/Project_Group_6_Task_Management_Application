const Task = require('../models/tasks');

// Get All Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks.' });
    }
};

// Create a Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, due_date } = req.body;

        if (!title || !description || !priority || !due_date) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const task = await Task.create({ title, description, priority, due_date });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task.' });
    }
};

// Update a Task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, due_date } = req.body;

        if (!title || !description || !priority || !due_date) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const updatedTask = await Task.update(id, { title, description, priority, due_date });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task.' });
    }
};

// Delete a Task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const success = await Task.delete(id);
        if (!success) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task.' });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const analytics = await Task.getAnalytics();
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve analytics.' });
    }
};
