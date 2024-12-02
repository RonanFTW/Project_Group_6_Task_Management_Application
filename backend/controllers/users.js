const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); 

// Sign-Up Function
exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already taken' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the user
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully!', user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
        console.error('[ERROR] Sign-Up Failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Sign-In Function
exports.signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a token for session management if needed
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('[ERROR] Sign-In Failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Users Function
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        const sanitizedUsers = users.map((user) => ({
            id: user._id,
            username: user.username,
        })); 
        res.status(200).json(sanitizedUsers);
    } catch (error) {
        console.error('[ERROR] Fetching Users Failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
