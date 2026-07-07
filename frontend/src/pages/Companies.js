import React, { useEffect, useState } from 'react';
import api from '../api';

const emptyForm = {
  name: '', jobRole: '', packageLpa: '', minCgpa: '', maxBacklogs: 0,
  eligibleBranches: '', driveDate: ''
};

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadCompanies = () => {
    api.get('/api/companies')
      .then(res => setCompanies(res.data))
      .catch(() => setError('Could not load companies. Is the backend running?'));
  };

  useEffect(() => { loadCompanies(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...form,
      packageLpa: parseFloat(form.packageLpa),
      minCgpa: parseFloat(form.minCgpa),
      maxBacklogs: parseInt(form.maxBacklogs || 0, 10),
      driveDate: form.driveDate || null
    };

    const request = editingId
      ? api.put(`/api/companies/${editingId}`, payload)
      : api.post('/api/companies', payload);

    request
      .then(() => {
        resetForm();
        loadCompanies();
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to save company');
      });
  };

  const handleEdit = (company) => {
    setEditingId(company.id);
    setForm({
      name: company.name,
      jobRole: company.jobRole || '',
      packageLpa: company.packageLpa,
      minCgpa: company.minCgpa,
      maxBacklogs: company.maxBacklogs,
      eligibleBranches: company.eligibleBranches,
      driveDate: company.driveDate || ''
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this company and its drive data?')) return;
    api.delete(`/api/companies/${id}`)
      .then(loadCompanies)
      .catch(() => setError('Failed to delete company'));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Companies</h1>
          <p>Manage companies and the eligibility criteria for their placement drives.</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <h2>{editingId ? 'Edit Company' : 'Add Company'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>Company Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Job Role</label>
              <input name="jobRole" value={form.jobRole} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Package (LPA)</label>
              <input type="number" step="0.1" name="packageLpa" value={form.packageLpa} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Minimum CGPA</label>
              <input type="number" step="0.01" min="0" max="10" name="minCgpa" value={form.minCgpa} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Max Backlogs Allowed</label>
              <input type="number" min="0" name="maxBacklogs" value={form.maxBacklogs} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Eligible Branches</label>
              <input name="eligibleBranches" value={form.eligibleBranches} onChange={handleChange} placeholder="CSE,IT,ECE" required />
            </div>
            <div className="field">
              <label>Drive Date</label>
              <input type="date" name="driveDate" value={form.driveDate} onChange={handleChange} />
            </div>
          </div>
          <p className="hint">Separate multiple branches with commas, e.g. CSE,IT,ECE</p>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add Company'}</button>
            {editingId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>All Companies ({companies.length})</h2>
        {companies.length === 0 ? (
          <div className="empty-state">No companies added yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Package</th>
                  <th>Min CGPA</th>
                  <th>Max Backlogs</th>
                  <th>Branches</th>
                  <th>Drive Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map(c => (
                  <tr key={c.id}>
                    <td data-label="Company">{c.name}</td>
                    <td data-label="Role">{c.jobRole || '-'}</td>
                    <td data-label="Package">{c.packageLpa ? `${c.packageLpa} LPA` : '-'}</td>
                    <td data-label="Min CGPA">{c.minCgpa}</td>
                    <td data-label="Max Backlogs">{c.maxBacklogs}</td>
                    <td data-label="Branches">{c.eligibleBranches}</td>
                    <td data-label="Drive Date">{c.driveDate || '-'}</td>
                    <td data-label="Actions">
                      <button className="btn btn-secondary btn-small" onClick={() => handleEdit(c)}>Edit</button>{' '}
                      <button className="btn btn-danger btn-small" onClick={() => handleDelete(c.id)}>Delete</button>
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
