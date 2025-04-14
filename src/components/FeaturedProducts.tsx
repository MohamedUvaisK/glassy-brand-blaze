
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

// Mock data for featured products
const products = [
  {
    id: "1",
    name: "Cotton Henley Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
    category: "men",
    isNew: true
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
    category: "men"
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1618244972963-dbad6cf64b21?q=80&w=800&auto=format&fit=crop",
    category: "women",
    isNew: true
  },
  {
    id: "4",
    name: "Sleek Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    category: "accessories"
  },
  {
    id: "5",
    name: "Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1616258734174-0b11a5a9d4c7?q=80&w=800&auto=format&fit=crop",
    category: "men",
    isSale: true,
    discountPrice: 149.99
  },
  {
    id: "6",
    name: "Casual Blouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1604772659841-a1612f9ed9c5?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=800&auto=format&fit=crop",
    category: "women",
    isSale: true,
    discountPrice: 29.99
  },
  {
    id: "7",
    name: "Leather Handbag",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1594422627559-11db23d0f373?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    category: "accessories"
  },
  {
    id: "8",
    name: "Wool Overcoat",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    category: "men"
  }
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(product => product.category === activeCategory);
  
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Discover our carefully curated selection of premium clothing and accessories</p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-brand-blue hover:bg-brand-blue-dark" : ""}
            >
              All
            </Button>
            <Button
              variant={activeCategory === "men" ? "default" : "outline"}
              onClick={() => setActiveCategory("men")}
              className={activeCategory === "men" ? "bg-brand-blue hover:bg-brand-blue-dark" : ""}
            >
              Men
            </Button>
            <Button
              variant={activeCategory === "women" ? "default" : "outline"}
              onClick={() => setActiveCategory("women")}
              className={activeCategory === "women" ? "bg-brand-blue hover:bg-brand-blue-dark" : ""}
            >
              Women
            </Button>
            <Button
              variant={activeCategory === "accessories" ? "default" : "outline"}
              onClick={() => setActiveCategory("accessories")}
              className={activeCategory === "accessories" ? "bg-brand-blue hover:bg-brand-blue-dark" : ""}
            >
              Accessories
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
