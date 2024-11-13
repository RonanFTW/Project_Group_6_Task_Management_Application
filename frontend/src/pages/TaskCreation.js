import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskHandling from '../components/TaskHandling';

const TaskCreation = () => {
const refresh = () => {};
    return (
        <div className="content">
            <Header/>
            <div className="main">
                <p><b>Create a task here!</b></p>
                <TaskHandling task={null} close={() => {}} refresh={refresh}/>
            </div>
            <Footer/>
        </div>
    );
};
export default TaskCreation;
