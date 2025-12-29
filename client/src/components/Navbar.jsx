// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Search, PlusSquare, User, MoreHorizontal, MessageCircle, MessageCircleHeart } from "lucide-react";
import instaLogo from "../img/instagram-logo.png"; // ensure this path is correct
import MoreMenu from "../pages/MoreMenu";

const Navbar = () => {
  const [openMore, setOpenMore] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // load initial state from document or localStorage
  useEffect(() => {
    const haveDark = document.documentElement.classList.contains("dark") ||
                     localStorage.getItem("theme") === "dark";
    setIsDark(Boolean(haveDark));
    // ensure document class matches localStorage (in case not loaded)
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const nextDark = !html.classList.contains("dark");
    if (nextDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsDark(nextDark);
  };

  return (
    <>
      <nav className="hidden lg:flex flex-col border-r border-gray-300 dark:border-gray-700 h-screen w-64 p-4 fixed bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="mb-10 px-3">
          <img src={instaLogo} alt="Instagram" className="h-14 object-contain" />
        </div>

        <Link to="/" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3">
          <Home size={26} />
          <span className="text-lg">Home</span>
        </Link>

        <Link to="/message" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3">
          <MessageCircle size={26} />
          <span className="text-lg">Messages</span>
        </Link>

        <Link to="/search" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3">
          <Search size={26} />
          <span className="text-lg">Search</span>
        </Link>

        <Link to="/create" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3">
          <PlusSquare size={26} />
          <span className="text-lg">Create</span>
        </Link>

        <Link to="/profile" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3">
          <User size={26} />
          <span className="text-lg">Profile</span>
        </Link>

        <button
          onClick={() => setOpenMore(!openMore)}
          className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-3 mt-auto"
        >
          <MoreHorizontal size={26} />
          <span className="text-lg">More</span>
        </button>

        {openMore && <MoreMenu toggleTheme={toggleTheme} isDark={isDark} close={() => setOpenMore(false)} />}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between px-6 py-2">
        <Link to="/" className="flex flex-col items-center text-gray-700 dark:text-gray-200">
          <Home size={24} />
        </Link>
        <Link to="/search" className="flex flex-col items-center text-gray-700 dark:text-gray-200">
          <Search size={24} />
        </Link>
        <Link to="/create" className="flex flex-col items-center text-gray-700 dark:text-gray-200">
          <PlusSquare size={24} />
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-700 dark:text-gray-200">
          <User size={24} />
        </Link>
      </nav>
    </>
  );
};


export default Navbar;