
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Layout() {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={`flex-1 ${isMobile ? 'pt-24' : 'pt-28'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
