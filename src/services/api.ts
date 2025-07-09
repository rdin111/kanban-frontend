// src/services/api.ts
import axios from 'axios';

// VITE_API_URL should be set to: https://kanban-backend-ti1r.onrender.com
const apiUrl = `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;