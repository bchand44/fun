import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ currentUser, onAddAPLClick, onShowUsersClick }) {
  const navigate = useNavigate();
  function handleLogout() {
    navigate('/');
  }
  return (
    <nav className="custom-navbar">
      <div className="custom-navbar-container">
        <div className="custom-navbar-links">
          <button className="custom-nav-link" onClick={onAddAPLClick}>Add APL</button>
          <NavLink className="custom-nav-link" to="/program">Program</NavLink>
        </div>
        <div className="custom-navbar-user">
          <button className="custom-nav-link" onClick={onShowUsersClick}>Current Users</button>
          {currentUser && (
            <span className="custom-user-name">{currentUser.name}</span>
          )}
          <button className="custom-logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </nav>
  );
}
