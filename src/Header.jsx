import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header({ currentUser, onAddAPLClick }) {
  const navigate = useNavigate();
  function handleLogout() {
    navigate('/');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="navbar-nav">
          <button className="nav-link btn btn-link" onClick={onAddAPLClick}>Add APL</button>
          <NavLink className="nav-link" to="/program">Program</NavLink>
          <NavLink className="nav-link" to="/testing-guide">Testing Guide</NavLink>
        </div>
        <div className="d-flex align-items-center gap-3">
          {currentUser && (
            <span className="fw-bold text-primary">{currentUser.name}</span>
          )}
          <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </nav>
  );
}
