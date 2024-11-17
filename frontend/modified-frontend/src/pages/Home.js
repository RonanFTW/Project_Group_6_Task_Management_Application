import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskList from '../components/TaskList';

const Home = () => {
    return (
        <div className='content'>
            <Header />
            <div className='main'>
                <TaskList />
                
      
                <div className='filter'>
                    <form>
                        <label>
                            <p>Sort by Task Status:</p>
                            <select>
                                <option value="">Sort by all</option>
                                <option value="open">Sort by open tasks</option>
                                <option value="inprog">Sort by in-progress tasks</option>
                                <option value="comp">Sort by completed tasks</option>
                                <option value="miss">Sort by overdue tasks</option>
                            </select>
                        </label>

                        <label>
                            <p>Sort by Priority Level:</p>
                            <select>
                                <option value="">Sort by all</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </label>

                        <label>
                            <p>Sort by Due Date:</p>
                            <input type="date" />
                        </label>

                        <button type="button">Apply Filters - Placeholder</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};
console.log('Home component loaded');


export default Home;
