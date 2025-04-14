
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-playfair mb-4">GLASSY</h3>
            <p className="text-gray-400 mb-4">
              Elevate your style with our premium clothing collection. Designed for the modern individual who appreciates quality and elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products?category=men" className="text-gray-400 hover:text-brand-blue transition-colors">Men</Link></li>
              <li><Link to="/products?category=women" className="text-gray-400 hover:text-brand-blue transition-colors">Women</Link></li>
              <li><Link to="/products?category=accessories" className="text-gray-400 hover:text-brand-blue transition-colors">Accessories</Link></li>
              <li><Link to="/products?tag=new" className="text-gray-400 hover:text-brand-blue transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?tag=sale" className="text-gray-400 hover:text-brand-blue transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-brand-blue transition-colors">Customer Service</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-brand-blue transition-colors">Track Order</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-brand-blue transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-brand-blue transition-colors">Shipping Info</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-brand-blue transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span className="text-gray-400">123 Fashion Street, Style City, SC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} />
                <span className="text-gray-400">info@glassy.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 GLASSY. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 text-sm hover:text-brand-blue transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-400 text-sm hover:text-brand-blue transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
