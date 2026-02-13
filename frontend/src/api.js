import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const guestbookApi = {
  getAll: () => API.get('/guestbook'),
  create: (data) => API.post('/guestbook', data),
  update: (id, data) => API.put(`/guestbook/${id}`, data),
  delete: (id) => API.delete(`/guestbook/${id}`),
};