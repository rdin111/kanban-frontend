import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLoader from "./components/AppLoader";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BoardPage from "./pages/BoardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            {/* Checks for an existing session before any page renders */}
            <AppLoader>
                <Routes>
                    {/* Root → /login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Public */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected routes */}
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

                    {/* Catch-all */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AppLoader>
        </BrowserRouter>
    );
}

export default App;
