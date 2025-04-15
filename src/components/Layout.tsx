
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

  // Parallax effect for elements with the parallax class
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || "0.1";
        const yPos = -(scrollY * parseFloat(speed));
        element.setAttribute('style', `transform: translateY(${yPos}px)`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={`flex-1 ${isMobile ? 'pt-16' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
