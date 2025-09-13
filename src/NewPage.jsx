import React, { useState } from 'react';
import { useUser } from './UserContext';
import Header from './Header';
import AddAPL from './AddAPL';
import './NewPage.css';

export default function NewPage() {
  const { user } = useUser();
  const [showAddAPL, setShowAddAPL] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState('');

  async function handleShowUsers() {
    setShowUsers(true);
    setLoadingUsers(true);
    setErrorUsers('');
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setErrorUsers('Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  }

  return (
    <div className="newpage-container">
      <Header
        currentUser={user}
        onAddAPLClick={() => setShowAddAPL((v) => !v)}
        onShowUsersClick={handleShowUsers}
      />
      <div className="main-content" style={{ display: showAddAPL ? 'none' : 'block' }}>
        <h2>Welcome, {user?.name || 'User'}!</h2>
        <p>This is your dashboard. Use the header to navigate.</p>
        {showUsers && (
          <div className="users-modal">
            <h4>Current Users (from Elasticsearch)</h4>
            {loadingUsers && <div>Loading...</div>}
            {errorUsers && <div className="alert alert-danger">{errorUsers}</div>}
            {Array.isArray(users) && users.length > 0 ? (
              <>
                {console.log('Users from Elasticsearch:', users)}
                <ul>
                  {users.map((u, idx) => (
                    <li key={u._id || idx}>
                      {u._source?.name ? u._source.name : <pre>{JSON.stringify(u._source, null, 2)}</pre>}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div>No users found.</div>
            )}
            <button className="btn btn-secondary" onClick={() => setShowUsers(false)}>Close</button>
          </div>
        )}
      </div>
      {showAddAPL && (
        <div className="addapl-overlay">
          <AddAPL onClose={() => setShowAddAPL(false)} />
        </div>
      )}
    </div>
  );
}
