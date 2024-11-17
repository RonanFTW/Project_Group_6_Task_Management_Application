const User = require('../models/users');

// Signup Controller
exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'Username already taken' });
        }

        const user = await User.create({ username, password });
        res.status(201).json({ message: 'User registered!', user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('[ERROR] Signup failed:', error);
        res.status(500).json({ error: error.message });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('[ERROR] Login failed:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get All Users Controller
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('[ERROR] Fetching users failed:', error);
        res.status(500).json({ error: error.message });
    }
};
