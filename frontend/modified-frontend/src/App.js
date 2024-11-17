import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskCreation from './pages/TaskCreation';
import Analytics from './pages/Analytics';
import SignUp from './pages/SignUp';  
import SignIn from './pages/SignIn';   


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/taskcreation" element={<TaskCreation />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
