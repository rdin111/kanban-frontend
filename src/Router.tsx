import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BoardPage from './pages/BoardPage';
import ProtectedRoute from './components/ProtectedRoute';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/board/:boardId"
                element={
                    <ProtectedRoute>
                        <BoardPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default Router;