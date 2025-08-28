import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load users');
        setLoading(false);
      });
  }, []);

  function handleLogout() {
    navigate('/');
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center" style={{ minHeight: '80vh' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card shadow p-4 animate__animated animate__fadeInDown mb-4">
          {/* Restored original dashboard content. Add your APL, stats, or instructional UI here. */}
          <h2 className="mb-3">Dashboard</h2>
          <p>Welcome to your automation dashboard. Here you can manage APLs, view lessons, and more.</p>
          {/* Add any previous content/components here */}
        </div>
      </div>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <div className="card shadow p-4 animate__animated animate__fadeInDown">
          <h2 className="mb-4">Users from Elasticsearch</h2>
          {loading && <div>Loading...</div>}
          {error && <div className="text-danger">{error}</div>}
          {!loading && !error && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id || u._source?.id || u._source?.email}>
                    <td>{u._source?.id}</td>
                    <td>{u._source?.name}</td>
                    <td>{u._source?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
