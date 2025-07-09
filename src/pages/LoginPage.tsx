import { Navigate } from 'react-router-dom';

function LoginPage() {
    return <Navigate to="/dashboard" replace />;
}

export default LoginPage;