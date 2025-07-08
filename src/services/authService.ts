import api from './api';
import type { IUser } from '../types';

export const getCurrentUser = async (): Promise<IUser | null> => {
    try {
        const { data } = await api.get('/auth/current_user');
        return data;
    } catch (error) {
        console.error('Not authenticated', error);
        return null;
    }
};

export const logout = async () => {
    try {
        await api.get('/auth/logout');
    } catch (error) {
        console.error('Logout failed', error);
    }
};

// New function for demo login
export const loginAsDemo = async (): Promise<IUser | null> => {
    try {
        const { data } = await api.post('/auth/demo');
        return data;
    } catch (error) {
        console.error('Demo login failed', error);
        return null;
    }
};