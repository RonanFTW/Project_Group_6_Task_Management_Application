import React, {useEffect, useState} from 'react';
import {DisTasks} from '../api/Api';
import TaskDisplay from './TaskDisplay';

const TaskList = () => {
    const [tasks, listtasks] = useState([]);

    useEffect(() => {
        const displaytasks = async () => {
            try {
                const res = await DisTasks();
                listtasks(res.data);
            } catch (error) {
                console.error("Tasks went boom, sorry", error);
            }
        };
        displaytasks();
    }, []);

    return (
        <div>
            <p><b>All Tasks</b></p>
            {tasks.map((task) => (
                <TaskDisplay key={task.id} task={task}/>
            ))}
        </div>
    );
};
export default TaskList;
