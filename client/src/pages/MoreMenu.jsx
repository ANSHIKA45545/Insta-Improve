import React from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../server/utils/logout";

const MoreMenu = ({ toggleTheme, isDark, close, user }) => {
  const currentIsDark = typeof isDark === "boolean" 
    ? isDark 
    : document.documentElement.classList.contains('dark');

  return (
    <div className="absolute bottom-20 left-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg p-4 rounded-xl w-56 border dark:border-gray-700 z-50">
      <button
        onClick={() => { toggleTheme(); }}
        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span>Theme</span>
        {currentIsDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {user ? (
        <button onClick={logoutUser} className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg">
          Logout
        </button>
      ) : (
        <Link to="/login" className="w-full block mt-2 text-center bg-blue-500 text-white py-2 rounded-lg">
          Login
        </Link>
      )}
    </div>
  );
};

export default MoreMenu;
