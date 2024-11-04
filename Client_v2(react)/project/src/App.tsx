import { Component, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import VideoCallPage from './components/VideoCallPage';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(false)} />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/video-call" element={<VideoCallPage />} />
      </Routes>
  </Router>
  )
}

export default App
