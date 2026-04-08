import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// We are importing the pages from the new folder we created
import LandingPage from './pages/LandingPage'; 
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* When the URL is localhost:3000/ */}
        <Route path="/" element={<LandingPage />} />
        
        {/* When the URL is localhost:3000/login */}
        <Route path="/login" element={<Login />} />
        
        {/* When the URL is localhost:3000/teacher */}
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;