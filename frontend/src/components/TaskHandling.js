import React, {useState} from 'react';
import {CreateTask, EditTask} from '../api/Api';

const TaskHandling = ({task, close, refresh}) => {
    const [title, astitle] = useState(task ? task.title: '');
    const [desc, asdesc] = useState(task ? task.desc: '');
    const [prio, asprio] = useState(task ? task.prio: '');
    const [due, asdue] = useState(task ? task.due: '');

    const taskoperation = async (event) => {
        event.preventDefault();
        try {
            if (task) {
                await EditTask(task.id, {title, desc, prio, due});
            } else {
                await CreateTask({title, desc, prio, due});
            }
            refresh();
            close();
        } catch (error) {
            console.error("*explosion sounds", error);
        }
    };
    return (
        <form onSubmit={taskoperation}>
            <h3>{task ? 'Edit Task' : 'Create Task'}</h3>
            <input type="text" value={title} onChange={(event) => astitle(event.target.value)} 
            placeholder='Task Title'></input>

            <textarea value={desc} onChange={(event) => asdesc(event.target.value)} 
            placeholder='Task Description'></textarea>

            <select value={prio} onChange={(event) => asprio(event.target.value)}>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
            </select>

            <input type="date" value={due} onChange={(event) => asdue(event.target.value)}>
            </input>

            <button type="submit">{task ? 'Save Changes' : 'Create Task'}</button>
            <button type="button" onClick={close}>Discard</button>
        </form>
    );
};
export default TaskHandling;
