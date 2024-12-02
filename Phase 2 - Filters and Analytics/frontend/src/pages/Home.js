import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskList from '../components/TaskList';
import {GetUsers, signInUser, userData} from '../api/Api';

const Home = () => {
    const [filter, applyfilter] = useState({
        status: '',
        priority: '',
        due_date: '',
        assigned_to: '',
    });

    const filtration = (event) => {
        const {name, value} = event.target;
        applyfilter({...filter, [name]: value});
    }

    const [users, setusers] = useState([]);
    useEffect(()=> {
        const userdata = async () => {
            try {
                const users = await GetUsers();
                setusers(users);
            } catch (err) {
                console.error("Unable to get the users", err);
            }
        };
        userdata();
    }, []);

    return (
        <div className='content'>
            <Header />
            <div className='main'>
                <TaskList filter={filter}/>

      
                <div className='filter'>
                    <form>
                        <label>
                            <p>Sort by Task Status:</p>
                            <select name="status" value={filter.status} 
                            onChange={filtration}>
                                <option value="">Sort by all</option>
                                <option value="open">Sort by open tasks</option>
                                <option value="miss">Sort by overdue tasks</option>
                            </select>
                        </label>

                        <label>
                            <p>Sort by Priority Level:</p>
                            <select name="priority" value={filter.priority} 
                            onChange={filtration}>
                                <option value="">Sort by all</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </label>

                        <label>
                            <p>Sort by Due Date:</p>
                            <input type="date" name="due_date" value={filter.due_date} 
                            onChange={filtration}/>
                        </label>

                        <label>
                            <p>Sort by individual assignment</p>
                            <select name="assigned_to" value={filter.assigned_to}
                            onChange={filtration}>
                                <option value="">Sort by All</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};
console.log('Home component loaded');
export default Home;