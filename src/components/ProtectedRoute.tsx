import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, status } = useAppSelector((state) => state.auth);

    // Show a spinner while the first auth check runs.
    if (status === "loading" || status === "idle") {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-lg" />
            </div>
        );
    }

    // If the user isn’t logged in, send them to /login (not /).
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise render the protected page.
    return <>{children}</>;
}

export default ProtectedRoute;
