import React, { useState } from 'react';

export default function Registration() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server');
    }
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card shadow p-4 animate__animated animate__fadeInDown">
          <h2 className="mb-4 text-center animate__animated animate__fadeIn">Student Registration</h2>
          {submitted ? (
            <div className="alert alert-success text-center animate__animated animate__fadeInUp">
              Thank you for registering, {form.name}!<br />
              <a href="/" className="btn btn-link mt-3">Go to Login</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger text-center animate__animated animate__shakeX">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="form-control animate__animated animate__fadeInLeft" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-control animate__animated animate__fadeInRight" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} required className="form-control animate__animated animate__fadeInLeft" />
              </div>
              <button type="submit" className="btn btn-primary w-100 animate__animated animate__pulse animate__delay-1s">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
