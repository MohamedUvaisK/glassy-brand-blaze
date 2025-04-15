
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavMenu from "./NavMenu";
import { useCart } from "@/hooks/useCart";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
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
        "fixed top-0 left-0 right-0 z-50 w-full mt-4 px-4",
        "glass-header py-2 shadow-lg rounded-full mx-auto max-w-[95%]",
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
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <Button 
              variant="ghost" 
              size="icon"
              type="submit"
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
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

      {/* Mobile Menu - Making it more opaque with a milky glassy appearance */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-white/50 backdrop-blur-md lg:hidden transition-all duration-300 rounded-3xl mt-16 mx-2 border border-white/30 shadow-lg"
        >
          <div className="flex flex-col h-full pt-6 p-6">
            <form onSubmit={handleSearch} className="relative mb-6">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-white/30 backdrop-blur-md border border-white/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <Button 
                variant="ghost" 
                size="icon"
                type="submit"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <Search size={20} />
              </Button>
            </form>
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
