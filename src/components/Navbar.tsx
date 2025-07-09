import { useNavigate, Link } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/authSlice";
import { logout } from "../services/authService";
import { useTheme } from "../hooks/useTheme";

function Navbar() {
    const { user } = useAppSelector((s) => s.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await logout();
        dispatch(setUser(null));
        navigate("/login");              // ⬅️ was "/" – fixed
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-4">
            <div className="flex-1">
                <Link to="/dashboard" className="btn btn-ghost text-xl">
                    KanbanApp
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
                    {theme === "winter" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {user && (
                    <>
            <span className="font-semibold">
              Welcome, {user.name.split(" ")[0]}
            </span>
                        <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
