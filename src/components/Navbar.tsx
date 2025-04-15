
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavMenu from "./NavMenu";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

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
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "glass py-2 shadow-lg"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold font-playfair">
            GLASSY
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          <NavMenu />
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
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 glass lg:hidden transition-all duration-300",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="flex flex-col h-full pt-20 p-6">
          <button
            className="absolute top-4 right-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col space-y-6 text-lg">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link to="/products?category=men" onClick={() => setMobileMenuOpen(false)}>Men</Link>
            <Link to="/products?category=women" onClick={() => setMobileMenuOpen(false)}>Women</Link>
            <Link to="/products?category=accessories" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
