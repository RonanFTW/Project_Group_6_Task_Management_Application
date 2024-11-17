import React, { useEffect, useState } from 'react';
import { DisTasks } from '../api/Api';
import TaskDisplay from './TaskDisplay';
import TaskHandling from './TaskHandling';
import '../App.css'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await DisTasks();
            if (Array.isArray(fetchedTasks)) {
                setTasks(fetchedTasks);
            } else {
                console.error('Invalid task format:', fetchedTasks);
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreate = () => {
        setSelectedTask(null);
        setShowForm(true);
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setShowForm(true);
    };

    const handleTaskCreated = () => {
        setSuccessMessage('Task created successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchTasks(); 
    };

    return (
        <div className="main">
            <h2>Task List</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {tasks.length === 0 ? (
                <div className="no-tasks">
                    <p>No tasks available.</p>
                </div>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <TaskDisplay
                            key={task.id}
                            task={task}
                            edit={handleEdit}
                            refresh={fetchTasks}
                        />
                    ))}
                </div>
            )}
            <div className="create-task-btn-container">
                <button onClick={handleCreate}>Create Task</button>
            </div>
            {showForm && (
                <TaskHandling
                    task={selectedTask}
                    close={() => setShowForm(false)}
                    refresh={fetchTasks}
                    onTaskCreated={handleTaskCreated}
                />
            )}
        </div>
    );
};

export default TaskList;
