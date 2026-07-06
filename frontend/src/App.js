import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Students from './pages/Students';
import Companies from './pages/Companies';
import EligibleStudents from './pages/EligibleStudents';
import Placements from './pages/Placements';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">SP</span>
            <span className="brand-name">Smart Placement Management</span>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Students</NavLink>
            <NavLink to="/companies" onClick={() => setMenuOpen(false)}>Companies</NavLink>
            <NavLink to="/eligibility" onClick={() => setMenuOpen(false)}>Eligibility</NavLink>
            <NavLink to="/applications" onClick={() => setMenuOpen(false)}>Applications</NavLink>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Students />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/eligibility" element={<EligibleStudents />} />
            <Route path="/applications" element={<Placements />} />
          </Routes>
        </main>

        <footer className="footer">
          Smart Placement Management System
        </footer>
      </div>
    </Router>
  );
}

export default App;
