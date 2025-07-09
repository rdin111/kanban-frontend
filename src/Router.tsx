import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BoardPage from "./pages/BoardPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Router() {
    return (
        <Routes>
            {/* Root always goes to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public login page */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            {/* Protected single-board view */}
            <Route
                path="/board/:boardId"
                element={
                    <ProtectedRoute>
                        <BoardPage />
                    </ProtectedRoute>
                }
            />

            {/* Anything else → /login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
