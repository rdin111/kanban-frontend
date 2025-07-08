import { Navigate, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice';
import { loginAsDemo } from '../services/authService';

function LoginPage() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5001/api/auth/google';
    };

    const handleDemoLogin = async () => {
        const user = await loginAsDemo();
        if (user) {
            // Set the user in Redux state
            dispatch(setUser(user));
            // Navigate to the dashboard
            navigate('/dashboard');
        } else {
            alert("Could not log in as demo user. Please ensure the user exists in the database.");
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to Kanban!</h1>
                    <p className="py-6">
                        A real-time, collaborative Kanban board to organize your tasks and boost productivity.
                    </p>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-primary"
                        >
                            Login with Google
                        </button>
                        <button
                            onClick={handleDemoLogin}
                            className="btn btn-secondary"
                        >
                            <LogIn className="h-4 w-4" />
                            Try a Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;