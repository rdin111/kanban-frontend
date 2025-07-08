// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import boardReducer from './boardSlice'; // Import boardReducer

export const store = configureStore({
    reducer: {
        auth: authReducer,
        boards: boardReducer, // Add boardReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;