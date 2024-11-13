import Home from './pages/Home';
import TaskCreation from './pages/TaskCreation';
import Analytics from './pages/Analytics';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//These are all of the conncetions used for displaying the webpage
function App() {
  return (
   <Router>
    <div>
      <nav>
        <a href="/">Home Page</a> |
        <a href="/taskcreation">Task Creation Page</a> |
        <a href="/analytics">Analytics Page</a> |
        <a href="/signup">Sign Up Page</a> |
        <a href="/Signin">Sign In Page</a>
      </nav>
    </div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/taskcreation" element={<TaskCreation/>}/>
      <Route path="/analytics" element={<Analytics/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
   </Router>
  );
}

export default App;
