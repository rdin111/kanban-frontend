import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLoader from "./components/AppLoader";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BoardPage from "./pages/BoardPage";

function App() {
    return (
        <BrowserRouter>
            <AppLoader>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />
                    <Route
                        path="/board/:boardId"
                        element={<BoardPage />}
                    />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </AppLoader>
        </BrowserRouter>
    );
}

export default App;