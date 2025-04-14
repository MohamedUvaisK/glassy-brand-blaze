
import { Link } from "react-router-dom";

export default function FeaturedCategories() {
  const categories = [
    {
      id: "men",
      name: "Men's Collection",
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop",
      link: "/products?category=men"
    },
    {
      id: "women",
      name: "Women's Collection",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
      link: "/products?category=women"
    },
    {
      id: "accessories",
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop",
      link: "/products?category=accessories"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Categories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore our collections and find your perfect style</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.link}
              className="relative overflow-hidden group rounded-xl h-[400px]"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 z-10"></div>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="glass px-8 py-4 rounded-lg transform transition-all duration-500 group-hover:scale-110">
                  <h3 className="text-xl text-white font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
