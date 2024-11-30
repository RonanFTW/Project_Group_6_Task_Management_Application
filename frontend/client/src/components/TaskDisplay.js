import React from 'react';
import { DelTask } from '../api/Api';

const TaskDisplay = ({task, edit}) => {
    const DEL = async () => {
        try {
            await DelTask(task.id);
        } catch (err) {
            console.log("Delete function went boom, sorry", err)
        }
    };

    return (
        <div className='task'>
            <p><b>{task.title}</b></p>
            <p>{task.desc}</p>
            <p>Priority Status: {task.prio}</p>
            <p>Due: {task.due}</p>
            <button onClick={DEL}>Delete</button>
            <button onClick={() => edit(task)}>Edit</button>
        </div>
    );
};
export default TaskDisplay;
