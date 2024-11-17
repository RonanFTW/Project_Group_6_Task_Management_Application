import React from 'react';
import { DelTask } from '../api/Api';

const TaskDisplay = ({ task, edit, refresh }) => {
    const handleDelete = async () => {
        try {
            await DelTask(task.id); 
            console.log(`Task "${task.title}" deleted successfully.`);
            refresh(); 
        } catch (err) {
            console.error("Failed to delete task:", err);
        }
    };

    // Format the due date 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className='task'>
            <p><b>{task.title}</b></p>
            <p><b>Description:</b> {task.description}</p>
            <p><b>Priority Status:</b> {task.priority}</p>
            <p><b>Due:</b> {formatDate(task.due_date)}</p> 
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => edit(task)}>Edit</button>
        </div>
    );
};

export default TaskDisplay;
