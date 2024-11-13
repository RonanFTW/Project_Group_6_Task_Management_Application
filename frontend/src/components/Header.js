import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>Task Management - You will never escape!</h1>
            <nav>
                <Link to="/">Home Page</Link>
                <Link to="/taskcreation">Task Creation Page</Link>
                <Link to="/analytics">Analytics Page</Link>
                <Link to="/signin">Sign In Here</Link>
                <Link to="/signup">Sign Up Here</Link>
            </nav>
        </header>
    );
};
export default Header;