import React from 'react';
import '../App.css'; 

const Header = () => {
    return (
        <div className="banner">
            <h1>Task Management - You will never escape!</h1>
            <div className="nav-links">
                <a href="/">Home Page</a>
                <a href="/taskcreation">Task Creation Page</a>
                <a href="/analytics">Analytics Page</a>
                <a href="/signin">Sign In Here</a>
                <a href="/signup">Sign Up Here</a>
            </div>
        </div>
    );
};

export default Header;
