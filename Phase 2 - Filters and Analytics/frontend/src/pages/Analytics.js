import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TaskAn } from '../api/Api';

const Analytics = () => {
    const [data, setData] = useState({ TTtasks: 0, comptasks: 0, ODtasks: 0, anpriority: {}, 
        taskrat: 0, TopTM: null, usercount: 0 });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await TaskAn();
                console.log("Analytics data received:", res);
                setData(res);
            } catch (error) {
                console.error("*Explosion noises*", error);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="content">
            <Header />
            <div className="main">
                <h1>Team Analytics and Performance</h1>
                <div className="tasksum">
                    <div className="TTD">
                    <p>Total Tasks: {data.TTtasks}</p>
                    </div>
                    <div className="TOD">
                    <p>Total Overdue Tasks: {data.ODtasks}</p>
                    </div>
                    <div className="TCD">
                    <p>Completed to Overdue Ratio: {data.taskrat}</p>
                    </div>
                    <div className='TPD'>
                    <p>Amount by priority status:</p>
                    <ul>
                        {Object.entries(data.anpriority).map(([priority, count]) => (
                            <li key={priority}>{priority}: {count}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                <div className="TTM">
                    <p><b>Team member performance</b></p>
                    <p><b>Team strength:</b> {data.usercount}</p>
                    {data.TopTM && data.TopTM.length > 0 ? (
                        <ul>
                            {data.TopTM.map((user) => (
                                <li key={user.id}>
                                    {user.username}: {user.task_count} tasks
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>This is a very lonely team</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Analytics;