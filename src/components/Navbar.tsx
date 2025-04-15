
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavMenu from "./NavMenu";
import { useCart } from "@/hooks/useCart";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigation = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full mt-4 px-4",
        isScrolled
          ? "glass-header py-2 shadow-lg rounded-full mx-auto max-w-[95%]"
          : "bg-transparent py-4 rounded-full mx-auto max-w-[95%]",
        isMobile && "glass-header-mobile"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold font-playfair" onClick={handleNavigation}>
            GLASSY
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          <NavMenu onNavigation={handleNavigation} />
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm hidden md:block focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <Button 
              variant="ghost" 
              size="icon"
              type="submit"
              className="absolute right-0 top-0 md:top-1/2 md:transform md:-translate-y-1/2"
            >
              <Search size={20} />
            </Button>
          </form>
          <Button variant="ghost" size="icon" onClick={handleNavigation} aria-label="User Profile">
            <User size={20} />
          </Button>
          <Link to="/cart" onClick={handleNavigation}>
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-blue text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Using a single X icon for closing */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 glass-header-mobile lg:hidden transition-all duration-300 rounded-3xl mt-16 mx-2"
        >
          <div className="flex flex-col h-full pt-6 p-6">
            <nav className="flex flex-col space-y-6 text-lg font-semibold">
              <Link to="/" onClick={handleNavigation}>Home</Link>
              <Link to="/products" onClick={handleNavigation}>Products</Link>
              <Link to="/products?category=men" onClick={handleNavigation}>Men</Link>
              <Link to="/products?category=women" onClick={handleNavigation}>Women</Link>
              <Link to="/products?category=accessories" onClick={handleNavigation}>Accessories</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
