import React, { useEffect, useState } from 'react';
import api from '../api';

const emptyForm = { name: '', rollNo: '', branch: '', cgpa: '', backlogs: 0, email: '', phone: '' };

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadStudents = () => {
    api.get('/students')
      .then(res => setStudents(res.data))
      .catch(() => setError('Could not load students. Is the backend running?'));
  };

  useEffect(() => { loadStudents(); }, []);

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
      cgpa: parseFloat(form.cgpa),
      backlogs: parseInt(form.backlogs || 0, 10)
    };

    const request = editingId
      ? api.put(`/students/${editingId}`, payload)
      : api.post('/students', payload);

    request
      .then(() => {
        resetForm();
        loadStudents();
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to save student');
      });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      rollNo: student.rollNo,
      branch: student.branch,
      cgpa: student.cgpa,
      backlogs: student.backlogs,
      email: student.email || '',
      phone: student.phone || ''
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this student?')) return;
    api.delete(`/students/${id}`)
      .then(loadStudents)
      .catch(() => setError('Failed to delete student'));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage student academic records used for placement eligibility.</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <h2>{editingId ? 'Edit Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Roll No</label>
              <input name="rollNo" value={form.rollNo} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Branch</label>
              <input name="branch" value={form.branch} onChange={handleChange} placeholder="CSE / IT / ECE" required />
            </div>
            <div className="field">
              <label>CGPA</label>
              <input type="number" step="0.01" min="0" max="10" name="cgpa" value={form.cgpa} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Backlogs</label>
              <input type="number" min="0" name="backlogs" value={form.backlogs} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="field">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add Student'}</button>
            {editingId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>All Students ({students.length})</h2>
        {students.length === 0 ? (
          <div className="empty-state">No students added yet.</div>
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
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td data-label="Name">{s.name}</td>
                    <td data-label="Roll No">{s.rollNo}</td>
                    <td data-label="Branch">{s.branch}</td>
                    <td data-label="CGPA">{s.cgpa}</td>
                    <td data-label="Backlogs">{s.backlogs}</td>
                    <td data-label="Contact">{s.email || '-'} {s.phone ? `| ${s.phone}` : ''}</td>
                    <td data-label="Actions">
                      <button className="btn btn-secondary btn-small" onClick={() => handleEdit(s)}>Edit</button>{' '}
                      <button className="btn btn-danger btn-small" onClick={() => handleDelete(s.id)}>Delete</button>
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
