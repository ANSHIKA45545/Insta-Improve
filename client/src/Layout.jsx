// Layout.js
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      {/* Navbar always visible */}
      <Navbar />

      {/* Main content changes depending on route */}
      <div className="flex-1 lg:ml-64 min-h-screen bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
