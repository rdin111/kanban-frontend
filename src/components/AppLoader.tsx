import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice';
import type { IUser } from '../types';

type AppLoaderProps = {
    children: React.ReactNode;
};

function AppLoader({ children }: AppLoaderProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const demoUser: IUser = {
            _id: 'demo-user',
            googleId: 'demo-user',
            name: 'Demo User',
            email: 'demo@example.com',
            isAnonymous: true,
        };
        dispatch(setUser(demoUser));
    }, [dispatch]);

    return <>{children}</>;
}

export default AppLoader;