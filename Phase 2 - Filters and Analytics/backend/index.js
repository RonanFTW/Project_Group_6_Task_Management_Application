const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');
const cors = require('cors');


app.use(express.json());

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend
app.use(express.json()); 


app.use('/api/tasks', tasksRoutes);
app.use('/api/users', usersRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Task Management API!' });
});


app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});