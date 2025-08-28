import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useUser } from './UserContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { setUser } = useUser();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setError('');
        setIsLoggedIn(true); // Set login state
        setUser(data.user); // Save user context
        setTimeout(() => navigate('/newpage'), 1000);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Could not connect to server');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif',
      boxSizing: 'border-box',
      overflow: 'auto',
    }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '28px',
          boxShadow: '0 8px 32px rgba(80,80,160,0.18)',
          padding: '40px 32px',
          textAlign: 'center',
          animation: 'fadeIn 1.2s',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#6e8efb',
            marginBottom: '24px',
            letterSpacing: '1px',
          }}>Login</h2>
          {error && <div style={{ background: '#ffe5e5', color: '#d32f2f', borderRadius: '12px', padding: '10px', marginBottom: '16px', fontWeight: 600, animation: 'shakeX 0.6s' }}>{error}</div>}
          {success && <div style={{ background: '#e5ffe5', color: '#388e3c', borderRadius: '12px', padding: '10px', marginBottom: '16px', fontWeight: 600, animation: 'fadeInUp 0.8s' }}>Login successful!</div>}
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontWeight: 600, color: '#6e8efb', marginBottom: '6px', display: 'block' }}>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #a777e3', fontSize: '1rem', marginBottom: '4px', outline: 'none', transition: 'border 0.2s' }} />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontWeight: 600, color: '#6e8efb', marginBottom: '6px', display: 'block' }}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #a777e3', fontSize: '1rem', marginBottom: '4px', outline: 'none', transition: 'border 0.2s' }} />
            </div>
            <button type="submit" style={{
              width: '100%',
              background: 'linear-gradient(90deg, #6e8efb 0%, #a777e3 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              padding: '14px',
              fontSize: '1.1rem',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(80,80,160,0.12)',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'transform 0.2s',
            }}>Login</button>
          </form>
          <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '1rem' }}>
            <span>Don't have an account? </span>
            <Link to="/register" style={{ color: '#a777e3', fontWeight: 600, textDecoration: 'none', marginLeft: '4px' }}>Register</Link>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shakeX {
          0% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
