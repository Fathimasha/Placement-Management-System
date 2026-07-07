import React, { useEffect, useState } from 'react';
import api from '../api';

export default function EligibleStudents() {
  const [companies, setCompanies] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [eligible, setEligible] = useState([]);
  const [error, setError] = useState('');
  const [applyMsg, setApplyMsg] = useState('');

  useEffect(() => {
    api.get('/api/companies')
      .then(res => setCompanies(res.data))
      .catch(() => setError('Could not load companies. Is the backend running?'));
  }, []);

  const selectedCompany = companies.find(c => String(c.id) === String(selectedId));

  const checkEligibility = (id) => {
    setSelectedId(id);
    setApplyMsg('');
    if (!id) {
      setEligible([]);
      return;
    }
    api.get(`/api/companies/${id}/eligible-students`)
      .then(res => setEligible(res.data))
      .catch(() => setError('Failed to fetch eligible students'));
  };

  const applyStudent = (studentId) => {
    setApplyMsg('');
    api.post('/api/placements/apply', { studentId, companyId: parseInt(selectedId, 10) })
      .then(() => setApplyMsg('Application registered successfully.'))
      .catch(err => setApplyMsg(err.response?.data?.error || 'Failed to register application'));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Eligibility Check</h1>
          <p>Select a company drive to see which students meet its placement criteria.</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <h2>Select Company Drive</h2>
        <div className="company-picker">
          <div className="field" style={{ minWidth: '260px' }}>
            <label>Company</label>
            <select value={selectedId} onChange={(e) => checkEligibility(e.target.value)}>
              <option value="">-- Choose a company --</option>
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.jobRole})</option>
              ))}
            </select>
          </div>
        </div>

        {selectedCompany && (
          <div className="criteria-list">
            <span>Min CGPA: <b>{selectedCompany.minCgpa}</b></span>
            <span>Max Backlogs: <b>{selectedCompany.maxBacklogs}</b></span>
            <span>Branches: <b>{selectedCompany.eligibleBranches}</b></span>
          </div>
        )}
      </div>

      {selectedId && (
        <div className="card">
          <h2>Eligible Students ({eligible.length})</h2>
          {applyMsg && <div className="hint">{applyMsg}</div>}
          {eligible.length === 0 ? (
            <div className="empty-state">No students currently meet this company's criteria.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Branch</th>
                    <th>CGPA</th>
                    <th>Backlogs</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {eligible.map(s => (
                    <tr key={s.id}>
                      <td data-label="Name">{s.name}</td>
                      <td data-label="Roll No">{s.rollNo}</td>
                      <td data-label="Branch">{s.branch}</td>
                      <td data-label="CGPA">{s.cgpa}</td>
                      <td data-label="Backlogs">{s.backlogs}</td>
                      <td data-label="Action">
                        <button className="btn btn-primary btn-small" onClick={() => applyStudent(s.id)}>Register for Drive</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
