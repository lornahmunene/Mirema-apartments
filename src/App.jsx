import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import LandingPage from './components/LandingPage'
import Login from './components/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
