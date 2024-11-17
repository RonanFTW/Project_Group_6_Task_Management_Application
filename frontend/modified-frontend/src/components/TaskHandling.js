import React, { useState } from 'react';
import { CreateTask, EditTask } from '../api/Api';
import '../App.css'; 

const TaskHandling = ({ task, close, refresh, onTaskCreated }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : 'Medium');
    const [due_date, setDueDate] = useState(task ? task.due_date : '');

    const taskOperation = async (event) => {
        event.preventDefault();
        try {
            console.log("Task data before submission:", { title, description, priority, due_date });
            if (task) {
                await EditTask(task.id, { title, description, priority, due_date });
            } else {
                await CreateTask({ title, description, priority, due_date });

               
                setTitle('');
                setDescription('');
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
