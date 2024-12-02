import React, { useEffect, useState } from 'react';
import { CreateTask, EditTask, GetUsers } from '../api/Api';
import '../App.css'; 

const TaskHandling = ({ task, close, refresh, onTaskCreated }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : 'Medium');
    const [due_date, setDueDate] = useState(task ? new Date(task.due_date).toISOString().split('T')[0] : '');
    const [users, setUsers] = useState([]);
    const [assigned_to, setAssignedTo] = useState(task ? task.assigned_to : '');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const uList = await GetUsers();
                setUsers(uList);
            } catch (err) {
                console.error('Where are they?', err);
            }
        };
        fetchUsers();
    }, []);

    const taskOperation = async (event) => {
        event.preventDefault();
        try {
            console.log("Task data before submission:", { title, description, priority, due_date, assigned_to});
            if (task) {
                await EditTask(task.id, { title, description, priority, due_date, assigned_to});
            } else {
                await CreateTask({ title, description, priority, due_date, assigned_to});

               
                setTitle('');
                setDescription('');
                setAssignedTo('');
                setPriority('Medium');
                setDueDate('');

            
                if (onTaskCreated) {
                    onTaskCreated();
                }
            }
            refresh();
            close();
        } catch (error) {
            console.error("Task operation failed:", error);
        }
    };

    return (
        <form onSubmit={taskOperation}>
            <h3>{task ? 'Edit Task' : 'Create Task'}</h3>

            <label htmlFor="task-title">Task Title</label>
            <input
                id="task-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Task Title"
                required
            />

            <label htmlFor="task-description">Task Description</label>
            <textarea
                id="task-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Task Description"
                required
            />

            <label htmlFor='taskassign'>Assign Task To</label>
            <select id="assigned_to" 
                value={assigned_to} 
                onChange={(event) => setAssignedTo(event.target.value)}
                required
            >
                <option value="">User Assignment</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))}
            </select>

            <label htmlFor="task-priority">Priority Level</label>
            <select
                id="task-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                required
            >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
            </select>

            <label htmlFor="task-due-date">Due Date</label>
            <input
                id="task-due-date"
                type="date"
                value={due_date}
                onChange={(event) => setDueDate(event.target.value)}
                required
            />

            <div style={{ textAlign: 'center' }}>
                <button type="submit">{task ? 'Save Changes' : 'Create Task'}</button>
                <button type="button" onClick={close} style={{ marginLeft: '10px' }}>Discard</button>
            </div>
        </form>
    );
};
export default TaskHandling;