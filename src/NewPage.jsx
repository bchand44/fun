import React, { useState } from 'react';
import { useUser } from './UserContext';
import Header from './Header';
import AddAPL from './AddAPL';
import './NewPage.css';

export default function NewPage() {
  const { user } = useUser();
  const [showAddAPL, setShowAddAPL] = useState(false);

  return (
    <div className="newpage-container">
      <Header
        currentUser={user}
        onAddAPLClick={() => setShowAddAPL((v) => !v)}
      />
      <div className="main-content" style={{ display: showAddAPL ? 'none' : 'block' }}>
        <h2>Welcome, {user?.name || 'User'}!</h2>
        <p>This is your dashboard. Use the header to navigate.</p>
      </div>
      {showAddAPL && (
        <div className="addapl-overlay">
          <AddAPL onClose={() => setShowAddAPL(false)} />
        </div>
      )}
    </div>
  );
}
