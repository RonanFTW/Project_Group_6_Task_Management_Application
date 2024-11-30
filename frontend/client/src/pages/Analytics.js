import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TaskAn } from '../api/Api';

const Analytics = () => {
    const [data, getdata] = useState({TTtasks: 0, comptasks: 0, ODtasks: 0, TopTM: null});

    useEffect(() => {
        const ret = async () => {
            try {
                const res = await TaskAn();
                getdata(res.data);
            } catch (error) {
                console.error("*Explosion noises*", error);
            }
        };
        ret();
    }, []);

    return (
        <div className="content">
            <Header/>
            <div className="main">
                <h1>Team Analytics and Performance</h1>
                <div className="tasksum">
                    <p>Total Tasks: {data.TTtasks}</p>
                    <p>Total Completed Tasks: {data.comptasks}</p>
                    <p>Total Overdue Tasks: {data.ODtasks}</p>
                </div>
                <div className="TTM">
                    <p><b>The Golden Goose</b></p>
                    {data.TopTM ? (
                        <div>
                        <p>{data.TopTM.name}</p>
                        <p>Tasks completed: {data.TopTM.comptasks}</p>
                        </div>
                    ) : ( 
                        <p>N/a</p>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default Analytics;
