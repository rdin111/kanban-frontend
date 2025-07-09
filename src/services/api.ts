// src/services/api.ts

import axios from 'axios';

const api = axios.create({
    // The proxy in vite.config.ts will handle this
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;