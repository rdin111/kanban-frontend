import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, status } = useAppSelector((state) => state.auth);

    // The key change is here:
    // Treat the initial 'idle' state as a loading state as well.
    if (status === 'loading' || status === 'idle') {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-lg"></span>
            </div>
        );
    }

    // After the check is complete, if the user is not authenticated, redirect.
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If the check is complete and the user is authenticated, show the page.
    return <>{children}</>;
}

export default ProtectedRoute;