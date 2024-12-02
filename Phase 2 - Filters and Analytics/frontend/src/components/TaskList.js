import React, { useEffect, useState } from 'react';
import { DisTasks } from '../api/Api';
import TaskDisplay from './TaskDisplay';
import TaskHandling from './TaskHandling';
import '../App.css'; 

const TaskList = ({filter}) => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await DisTasks();
            if (Array.isArray(fetchedTasks)) {
                setTasks(fetchedTasks);
                setFilteredTasks(fetchedTasks);
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

    useEffect(() => {
        let filtration = tasks;
        if (filter.status) {
            const pointintime = new Date().toISOString().split('T')[0];
            if (filter.status === "open") {
                filtration = filtration.filter((task) => 
                    new Date(task.due_date).toISOString().split('T')[0] >= pointintime);
            } else if (filter.status === "miss") {
                filtration = filtration.filter((task) => 
                    new Date(task.due_date).toISOString().split('T')[0] < pointintime);
            }
        }
        if (filter.priority) {
            filtration = filtration.filter((task) => task.priority === filter.priority);
        }
        if (filter.due_date) {
            filtration = filtration.filter((task) => {
                const dateadjust = new Date(task.due_date).toISOString().split('T')[0];
                return dateadjust === filter.due_date;
            });
        }
        if (filter.assigned_to) {
            filtration = filtration.filter((task) => task.assigned_to === parseInt(filter.assigned_to, 10));
        }
        setFilteredTasks(filtration);
    }, [tasks, filter]);

    return (
        <div className="main">
            <h2>Task List</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {filteredTasks.length === 0 ? (
                <div className="no-tasks">
                    <p>No tasks available.</p>
                </div>
            ) : (
                <div>
                    {filteredTasks.map((task) => (
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