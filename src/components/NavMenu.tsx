
import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <>
      <Link to="/" className="nav-link">Home</Link>
      <div className="relative group">
        <Link to="/products?category=men" className="nav-link">Men</Link>
        <div className="absolute left-0 top-full mt-2 w-48 glass rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="p-4 space-y-2">
            <Link to="/products?category=men&subcategory=shirts" className="block hover:text-brand-blue transition-colors">Shirts</Link>
            <Link to="/products?category=men&subcategory=pants" className="block hover:text-brand-blue transition-colors">Pants</Link>
            <Link to="/products?category=men&subcategory=jackets" className="block hover:text-brand-blue transition-colors">Jackets</Link>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Link to="/products?category=women" className="nav-link">Women</Link>
        <div className="absolute left-0 top-full mt-2 w-48 glass rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="p-4 space-y-2">
            <Link to="/products?category=women&subcategory=dresses" className="block hover:text-brand-blue transition-colors">Dresses</Link>
            <Link to="/products?category=women&subcategory=tops" className="block hover:text-brand-blue transition-colors">Tops</Link>
            <Link to="/products?category=women&subcategory=skirts" className="block hover:text-brand-blue transition-colors">Skirts</Link>
          </div>
        </div>
      </div>
      <Link to="/products?category=accessories" className="nav-link">Accessories</Link>
    </>
  );
}
