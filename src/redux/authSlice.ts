import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../types';

interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded';
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    status: 'idle',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLoading: (state) => {
            state.status = 'loading';
        },
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
            state.isAuthenticated = true; // Always authenticated
            state.status = 'succeeded';
        },
    },
});

export const { setUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;