// src/components/AppLoader.tsx

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice';
import { getCurrentUser } from '../services/authService';

const AppLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                dispatch(setUser(user));
            } catch (error) {
                dispatch(setUser(null));
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-lg"></span>
            </div>
        );
    }

    return <>{children}</>;
};

export default AppLoader;