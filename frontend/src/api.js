import axios from 'axios';

const api = axios.create({
  baseURL: 'https://placement-management-system-1mbj.onrender.com',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
