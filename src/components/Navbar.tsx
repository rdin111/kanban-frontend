import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

function Navbar() {
    const { theme, toggleTheme } = useTheme();

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
            </div>
        </div>
    );
}

export default Navbar;