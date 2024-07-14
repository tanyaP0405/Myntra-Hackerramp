import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Userdashboard from './components/Userdashboard';
 import AdminDashboard from './components/Admindashboard';
 import DesignView from './components/DesignView';
 import Poll from './components/Poll';
 import Leaderboard from './components/Leaderboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<Userdashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/view-design" element={<DesignView />} />
        <Route path="/user-dashboard-poll" element={<Poll />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
