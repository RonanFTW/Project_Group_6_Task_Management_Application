const pool = require('../config/db');

const Task = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM tasks');
        return result.rows;
    },

    create: async (task) => {
        try {
            console.log("Inserting task data into database:", task);
            const result = await pool.query(
                'INSERT INTO tasks (title, description, priority, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
                [task.title, task.description, task.priority, task.due_date] 
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    update: async (id, updates) => {
        const { title, description, priority, due_date } = updates;
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, priority = $3, due_date = $4 WHERE id = $5 RETURNING *',
            [title, description, priority, due_date, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        return result.rowCount > 0;
    },
};

module.exports = Task;
