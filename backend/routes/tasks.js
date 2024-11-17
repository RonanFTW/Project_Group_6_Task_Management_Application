const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');

// Routes
router.get('/', getTasks);           
router.post('/', createTask);      
router.put('/:id', updateTask);      
router.delete('/:id', deleteTask);    

module.exports = router;
