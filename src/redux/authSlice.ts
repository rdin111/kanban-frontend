import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../types';

interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    // Add a status to track the initial auth check
    status: 'idle' | 'loading' | 'succeeded';
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    status: 'idle', // Start in 'idle' state
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // New action to set the status to loading
        setAuthLoading: (state) => {
            state.status = 'loading';
        },
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            // When user is set, the check is successful
            state.status = 'succeeded';
        },
    },
});

export const { setUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;