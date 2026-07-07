import React, { useEffect, useState } from 'react';
import api from '../api';

const badgeClass = (status) => {
  if (status === 'SELECTED') return 'badge badge-selected';
  if (status === 'REJECTED') return 'badge badge-rejected';
  return 'badge badge-applied';
};

export default function Placements() {
  const [placements, setPlacements] = useState([]);
  const [error, setError] = useState('');

  const load = () => {
    api.get('/api/placements')
      .then(res => setPlacements(res.data))
      .catch(() => setError('Could not load applications. Is the backend running?'));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = (id, status) => {
    api.put(`/api/placements/${id}/status`, { status })
      .then(load)
      .catch(() => setError('Failed to update status'));
  };

  const remove = (id) => {
    if (!window.confirm('Remove this application record?')) return;
    api.delete(`/api/placements/${id}`)
      .then(load)
      .catch(() => setError('Failed to delete record'));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p>Track every student application across placement drives and update outcomes.</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <h2>All Applications ({placements.length})</h2>
        {placements.length === 0 ? (
          <div className="empty-state">No applications yet. Register students from the Eligibility page.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {placements.map(p => (
                  <tr key={p.id}>
                    <td data-label="Student">{p.student?.name}</td>
                    <td data-label="Roll No">{p.student?.rollNo}</td>
                    <td data-label="Company">{p.company?.name}</td>
                    <td data-label="Role">{p.company?.jobRole || '-'}</td>
                    <td data-label="Applied On">{p.appliedDate}</td>
                    <td data-label="Status"><span className={badgeClass(p.status)}>{p.status}</span></td>
                    <td data-label="Actions">
                      <select
                        className="status-select"
                        value={p.status}
                        onChange={(e) => updateStatus(p.id, e.target.value)}
                      >
                        <option value="APPLIED">APPLIED</option>
                        <option value="SELECTED">SELECTED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>{' '}
                      <button className="btn btn-danger btn-small" onClick={() => remove(p.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
