// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;