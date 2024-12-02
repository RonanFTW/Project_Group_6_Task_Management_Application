const express = require('express');
const router = express.Router();
const { signUp, login, getAllUsers } = require('../controllers/users');

// Routes
router.post('/signup', signUp);
router.post('/login', login);  
router.get('/', getAllUsers);   

module.exports = router;