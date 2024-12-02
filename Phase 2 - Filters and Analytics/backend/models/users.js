const pool = require('../config/db'); // For db connection

const User = {
    getAll: async () => {
        const result = await pool.query('SELECT id, username FROM users');
        return result.rows;
    },
    create: async ({ username, password }) => {
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, password]
        );
        return result.rows[0];
    },
    findByUsername: async (username) => {
        const result = await pool.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },
};

module.exports = User;