const pool = require('../config/db');

const Task = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM tasks LEFT JOIN users ON tasks.assigned_to = users.id');
        return result.rows;
    },

    create: async (task) => {
        try {
            console.log("Inserting task data into database:", task);
            const result = await pool.query(
                'INSERT INTO tasks (title, description, priority, due_date, assigned_to) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [task.title, task.description, task.priority, task.due_date, task.assigned_to || null] 
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    update: async (id, updates) => {
        const { title, description, priority, due_date, assigned_to } = updates;
        const result = await pool.query(
            `UPDATE tasks SET title = $1, description = $2, priority = $3, due_date = $4, assigned_to = $5 WHERE id = $6 RETURNING *`,
            [title, description, priority, due_date, assigned_to || null, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        return result.rowCount > 0;
    },

    getAnalytics: async () => {
        const ananalytics = {};
        const antotaltasks = 'SELECT COUNT(*) FROM tasks';
        const anpriority = `SELECT priority, COUNT(*) FROM tasks GROUP BY priority`;
        const angoldengoose = `SELECT users.id, users.username, COUNT (tasks.id) AS task_count FROM users
        LEFT JOIN tasks ON tasks.assigned_to = users.id GROUP BY users.id, users.username ORDER BY task_count DESC`;
        const anoverdue = `SELECT COUNT(*) FROM tasks WHERE due_date < NOW()`;
        const anopen = `SELECT COUNT(*) FROM tasks WHERE due_date >= NOW()`;
        const anusers = `SELECT COUNT(*) FROM users`;
        const ananchors = `SELECT users.id, users.username, COUNT(tasks.id) AS overdue_count FROM users
        LEFT JOIN tasks ON tasks.assigned_to = users.id WHERE tasks.due_date < NOW()
        GROUP BY users.id, users.username ORDER BY overdue_count DESC`;
        const aninactive = `SELECT id, username FROM users WHERE id NOT IN (
            SELECT assigned_to FROM tasks WHERE assigned_to IS NOT NULL)`;
        const [totaltasks, priority, goldengoose, overdue, open, users, anchors, inactive] = await Promise.all([ 
            pool.query(antotaltasks), 
            pool.query(anpriority), 
            pool.query(angoldengoose), 
            pool.query(anoverdue),
            pool.query(anopen),
            pool.query(anusers),
            pool.query(ananchors),
            pool.query(aninactive),
        ]);

        ananalytics.TTtasks = parseInt(totaltasks.rows[0].count, 10);
        ananalytics.anpriority = priority.rows.reduce((ret, row) => {
            ret[row.priority] = parseInt(row.count, 10);
            return ret;
        }, {});
        ananalytics.TopTM = goldengoose.rows;
        ananalytics.ODtasks =parseInt(overdue.rows[0].count, 10);
        ananalytics.taskrat = ((open.rows[0].count) / (totaltasks.rows[0].count)).toFixed(2);
        ananalytics.usercount = parseInt(users.rows[0].count, 10);
        ananalytics.anchors = anchors.rows;
        ananalytics.inactive = inactive.rows;
        return ananalytics;
    },
};

module.exports = Task;
