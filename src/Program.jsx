import React, { useState, useEffect } from 'react';
import { FaLink, FaCheckCircle } from 'react-icons/fa';

export default function Program() {
  const [programName, setProgramName] = useState('');
  const [site, setSite] = useState('1'); // 1=Florida, 56=Texas
  const [aplOptions, setAplOptions] = useState([]);
  const [selectedApl, setSelectedApl] = useState('');
  const [message, setMessage] = useState('');

  async function fetchApls() {
    setAplOptions([]);
    setSelectedApl('');
    try {
      const res = await fetch(`http://localhost:5001/api/apls?site=${site}`);
      const data = await res.json();
      if (res.ok) setAplOptions(data);
    } catch {
      setAplOptions([]);
    }
  }

  useEffect(() => {
    fetchApls();
  }, [site]);

  async function handleLinkApl() {
    setMessage('');
    if (!programName || !selectedApl) {
      setMessage('Please enter a program name and select an APL.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5001/api/link-apl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programName, site, aplNumber: selectedApl }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('APL has been linked successfully!');
        fetchApls(); // Refresh dropdown after link
      } else {
        setMessage(data.error || 'Failed to link APL.');
      }
    } catch {
      setMessage('Server error.');
    }
  }

  return (
    <div className="container-fluid" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card shadow-lg p-4 rounded-4 animate__animated animate__fadeIn" style={{ maxWidth: 500, width: '100%', background: '#fff' }}>
          <h2 className="mb-4 text-center fw-bold" style={{ color: '#2a5298' }}>Program Linker</h2>
          <div className="mb-3">
            <label className="form-label fw-semibold">Program Name</label>
            <input type="text" className="form-control rounded-3" value={programName} onChange={e => setProgramName(e.target.value)} placeholder="Enter program name" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Site</label>
            <select className="form-select rounded-3" value={site} onChange={e => setSite(e.target.value)}>
              <option value="1">Florida</option>
              <option value="56">Texas</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">APL Number</label>
            <select className="form-select rounded-3" value={selectedApl} onChange={e => setSelectedApl(e.target.value)}>
              <option value="">Select APL</option>
              {aplOptions.map(apl => (
                <option key={apl.aplNumber} value={apl.aplNumber}>{apl.aplNumber}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '1.1rem', fontWeight: 500 }} onClick={handleLinkApl}>
            <FaLink /> Link
          </button>
          {message && (
            <div className="alert alert-info mt-3 d-flex align-items-center gap-2 animate__animated animate__fadeInUp">
              <FaCheckCircle style={{ color: '#2a5298' }} /> {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
