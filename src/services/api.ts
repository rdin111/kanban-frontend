// src/services/api.ts

import axios from 'axios';

const api = axios.create({
    // The proxy in vite.config.ts will handle this
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;