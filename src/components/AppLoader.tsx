import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setUser, setAuthLoading } from '../redux/authSlice'; // Import new action
import { getCurrentUser } from '../services/authService';

type AppLoaderProps = {
    children: React.ReactNode;
};

function AppLoader({ children }: AppLoaderProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkUser = async () => {
            // Signal that we are starting the auth check
            dispatch(setAuthLoading());
            try {
                const user = await getCurrentUser();
                dispatch(setUser(user));
            } catch (error) {
                console.error("Auth check failed", error);
                // If it fails, we still set user to null to complete the check
                dispatch(setUser(null));
            }
        };

        checkUser();
    }, [dispatch]);

    return <>{children}</>; // The loader will no longer show its own spinner
}

export default AppLoader;