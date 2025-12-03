import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8090/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Students API
export const studentsAPI = {
    getAll: () => api.get('/admin/students'),
    getById: (id) => api.get(`/admin/students/${id}`),
    create: (data) => api.post('/admin/students', data),
    update: (id, data) => api.put(`/admin/students/${id}`, data),
    delete: (id) => api.delete(`/admin/students/${id}`),
};

// Diary Entries API
export const diaryAPI = {
    getAll: (studentId) => api.get('/admin/diary-entries', { params: { student_id: studentId } }),
    getById: (id) => api.get(`/admin/diary-entries/${id}`),
    create: (data) => api.post('/admin/diary-entries', data),
    update: (id, data) => api.put(`/admin/diary-entries/${id}`, data),
    delete: (id) => api.delete(`/admin/diary-entries/${id}`),
    getByShareKey: (shareKey) => api.get(`/share/diary/${shareKey}`),
};



export default api;
