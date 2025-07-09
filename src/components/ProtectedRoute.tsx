import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    // Get both isAuthenticated and the new status
    const { isAuthenticated, status } = useAppSelector((state) => state.auth);

    // While the initial auth check is loading, show a full-screen spinner
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-lg"></span>
            </div>
        );
    }

    // After the check is done, if the user is not authenticated, redirect
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If the check is done and the user is authenticated, render the children
    return <>{children}</>;
}

export default ProtectedRoute;