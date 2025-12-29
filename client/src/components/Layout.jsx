import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const location = useLocation();

  // Routes where navbar should NOT appear
  const hideNavbarRoutes = ["/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />} 
      {children}
    </>
  );
}
