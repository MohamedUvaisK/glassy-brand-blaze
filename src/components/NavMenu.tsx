
import { Link } from "react-router-dom";

export default function NavMenu({ onNavigation }) {
  const handleClick = () => {
    if (onNavigation) {
      onNavigation();
    } else {
      // Fallback if onNavigation is not provided
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Link to="/" className="nav-link font-medium" onClick={handleClick}>Home</Link>
      <div className="relative group">
        <Link to="/products?category=men" className="nav-link font-medium" onClick={handleClick}>Men</Link>
        <div className="absolute left-0 top-full mt-2 w-48 glass-header rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="p-4 space-y-2">
            <Link to="/products?category=men&subcategory=shirts" className="block hover:text-brand-blue transition-colors" onClick={handleClick}>Shirts</Link>
            <Link to="/products?category=men&subcategory=pants" className="block hover:text-brand-blue transition-colors" onClick={handleClick}>Pants</Link>
            <Link to="/products?category=men&subcategory=jackets" className="block hover:text-brand-blue transition-colors" onClick={handleClick}>Jackets</Link>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Link to="/products?category=women" className="nav-link font-medium" onClick={handleClick}>Women</Link>
        <div className="absolute left-0 top-full mt-2 w-48 glass-header rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="p-4 space-y-2">
            <Link to="/products?category=women&subcategory=dresses" className="block hover:text-brand-blue transition-colors" onClick={handleClick}>Dresses</Link>
            <Link to="/products?category=women&subcategory=tops" className="block hover:text-brand-blue transition-colors" onClick={handleClick}>Tops</Link>
            <Link to="/products?category=women&subcategory=skirts" className="block hover:text-brand-blue transition-colors" onClick={handleClick}>Skirts</Link>
          </div>
        </div>
      </div>
      <Link to="/products?category=accessories" className="nav-link font-medium" onClick={handleClick}>Accessories</Link>
    </>
  );
}
