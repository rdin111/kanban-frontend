// src/services/api.ts

import axios from 'axios';

const api = axios.create({
    // The proxy in vite.config.ts will handle this in development
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    // Add this line to send cookies with every request
    withCredentials: true,
});

export default api;