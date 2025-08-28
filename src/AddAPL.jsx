import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddAPL({ onClose }) {
  const [site, setSite] = useState('Florida');
  const [aplNumber, setAplNumber] = useState('');
  const [rowCount, setRowCount] = useState(1);
  const [rows, setRows] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerateAPL() {
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:5001/api/generate-apl');
      const data = await res.json();
      setAplNumber(data.aplNumber);
    } catch {
      setError('Could not generate APL number');
    }
  }

  function handleGenerateRows() {
    setRows(Array.from({ length: rowCount }, () => ({ itemId: '', startDate: '', endDate: '' })));
  }

  function handleRowChange(idx, field, value) {
    setRows(rows.map((row, i) => i === idx ? { ...row, [field]: value } : row));
  }

  async function handleSave() {
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:5001/api/save-apl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aplNumber, site, rows }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Save failed');
      }
    } catch {
      setError('Could not connect to server');
    }
  }

  return (
    <div className="addapl-collage p-4 rounded shadow-lg bg-white position-relative">
      <button className="btn btn-secondary position-absolute top-0 end-0 m-2" onClick={onClose}>Close</button>
      <h3>Add APL</h3>
      <Form className="mb-4">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Site</Form.Label>
          <Col sm={4}>
            <Form.Select value={site} onChange={e => setSite(e.target.value)}>
              <option value="Florida">Florida</option>
              <option value="Texas">Texas</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>APL Number</Form.Label>
          <Col sm={4}>
            <Form.Control value={aplNumber} readOnly />
          </Col>
          <Col sm={2}>
            <Button onClick={handleGenerateAPL}>Generate APL</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Number of Rows</Form.Label>
          <Col sm={2}>
            <Form.Control type="number" min={1} value={rowCount} onChange={e => setRowCount(Number(e.target.value))} />
          </Col>
          <Col sm={2}>
            <Button onClick={handleGenerateRows}>Generate Grid</Button>
          </Col>
        </Form.Group>
      </Form>
      {error && <div className="alert alert-danger text-center animate__animated animate__shakeX">{error}</div>}
      {success && <div className="alert alert-success text-center animate__animated animate__fadeInUp">APL data saved successfully!</div>}
      {rows.length > 0 && (
        <Form>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>APL Number</th>
                <th>Item ID</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td><Form.Control value={aplNumber} readOnly /></td>
                  <td><Form.Control value={row.itemId} onChange={e => handleRowChange(idx, 'itemId', e.target.value)} /></td>
                  <td>
                    <DatePicker
                      selected={row.startDate ? new Date(row.startDate) : null}
                      onChange={date => handleRowChange(idx, 'startDate', date ? date.toISOString().split('T')[0] : '')}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      placeholderText="Select start date"
                    />
                  </td>
                  <td>
                    <DatePicker
                      selected={row.endDate ? new Date(row.endDate) : null}
                      onChange={date => handleRowChange(idx, 'endDate', date ? date.toISOString().split('T')[0] : '')}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      placeholderText="Select end date"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={handleSave}>Save</Button>
        </Form>
      )}
    </div>
  );
}
