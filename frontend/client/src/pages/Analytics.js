import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TaskAn } from '../api/Api';

const Analytics = () => {
    const [data, setData] = useState({ TTtasks: 0, comptasks: 0, ODtasks: 0, anpriority: {}, 
        taskrat: 0, TopTM: null, usercount: 0, anchors: [], inactive: 0 });

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
                    <h3><b>Current Task Data</b></h3>
                    <div className="TTD">
                    <p><b>Total Tasks:</b> {data.TTtasks}</p>
                    </div>
                    <div className="TOD">
                    <p><b>Total Overdue Tasks:</b> {data.ODtasks}</p>
                    </div>
                    <div className="TCD">
                    <p><b>Completed to Overdue Ratio:</b> {data.taskrat}</p>
                    </div>
                    <div className='TPD'>
                    <p><b>Amount by priority status:</b></p>
                    <ul>
                        {Object.entries(data.anpriority).map(([priority, count]) => (
                            <li key={priority}>{priority}: {count}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                <div className="TTM">
                    <h3><b>Team Member Performance</b></h3>
                    <div className="TPD">
                    <p><b>Team strength:</b> {data.usercount}</p>
                    </div>
                    <div className="TPD">
                        <p><b>Team members by amount of assigned tasks:</b></p>
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
                    <div className="TPD">
                        <p><b>Team by amount of overdue tasks:</b></p>
                        {data.anchors.length > 0 ? (
                            <ul>
                                {data.anchors.map((user) => (
                                    <li key={user.id}>
                                        {user.username}: {user.overdue_count}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No overdue tasks?? Is it truly possible??</p>
                        )}
                    </div>
                    <div className="TPD">
                        <p><b>Users with no tasks:</b></p>
                        {data.inactive && data.inactive.length > 0 ? (
                        <ul>
                            {data.inactive.map((user) => (
                                <li key={user.id}>
                                    {user.username}
                                </li>
                            ))}
                        </ul>
                        ) : (
                            <p>Can you believe it?? A 100% active team??</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Analytics;
