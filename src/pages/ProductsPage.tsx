
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Filter, SlidersHorizontal, X } from "lucide-react";

// Mock data for products
const allProducts = [
  {
    id: "1",
    name: "Cotton Henley Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
    category: "men",
    subcategory: "shirts",
    isNew: true
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
    category: "men",
    subcategory: "pants"
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1618244972963-dbad6cf64b21?q=80&w=800&auto=format&fit=crop",
    category: "women",
    subcategory: "dresses",
    isNew: true
  },
  {
    id: "4",
    name: "Sleek Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    category: "accessories",
    subcategory: "watches"
  },
  {
    id: "5",
    name: "Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1616258734174-0b11a5a9d4c7?q=80&w=800&auto=format&fit=crop",
    category: "men",
    subcategory: "jackets",
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
    subcategory: "tops",
    isSale: true,
    discountPrice: 29.99
  },
  {
    id: "7",
    name: "Leather Handbag",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1594422627559-11db23d0f373?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    category: "accessories",
    subcategory: "bags"
  },
  {
    id: "8",
    name: "Wool Overcoat",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    category: "men",
    subcategory: "jackets"
  },
  {
    id: "9",
    name: "Pleated Skirt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop",
    category: "women",
    subcategory: "skirts"
  },
  {
    id: "10",
    name: "Silk Scarf",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1584461808043-8580e999c75f?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=800&auto=format&fit=crop",
    category: "accessories",
    subcategory: "scarves"
  },
  {
    id: "11",
    name: "Linen Button Down",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1598522325320-68d6279cffd0?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=800&auto=format&fit=crop",
    category: "men",
    subcategory: "shirts"
  },
  {
    id: "12",
    name: "Strappy Heels",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=800&auto=format&fit=crop",
    category: "women",
    subcategory: "shoes"
  }
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  
  // Initialize filters from URL parameters
  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
    
    if (tag === "new" || tag === "sale") {
      setSelectedStatus([tag]);
    }
  }, [category, tag]);
  
  // Apply filters
  useEffect(() => {
    let products = [...allProducts];
    
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply filters from URL params
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    if (subcategory) {
      products = products.filter(p => p.subcategory === subcategory);
    }
    
    if (tag === "new") {
      products = products.filter(p => p.isNew);
    } else if (tag === "sale") {
      products = products.filter(p => p.isSale);
    }
    
    // Apply selected category filters
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }
    
    // Apply selected status filters
    if (selectedStatus.includes('new')) {
      products = products.filter(p => p.isNew);
    }
    if (selectedStatus.includes('sale')) {
      products = products.filter(p => p.isSale);
    }
    
    // Apply price range filter
    products = products.filter(p => {
      const price = p.discountPrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    setFilteredProducts(products);
  }, [category, subcategory, tag, search, priceRange, selectedCategories, selectedStatus]);
  
  const getPageTitle = () => {
    if (search) return `Search Results for "${search}"`;
    if (tag === "new") return "New Arrivals";
    if (tag === "sale") return "Sale Items";
    if (category === "men" && subcategory === "shirts") return "Men's Shirts";
    if (category === "men" && subcategory === "pants") return "Men's Pants";
    if (category === "men" && subcategory === "jackets") return "Men's Jackets";
    if (category === "women" && subcategory === "dresses") return "Women's Dresses";
    if (category === "women" && subcategory === "tops") return "Women's Tops";
    if (category === "women" && subcategory === "skirts") return "Women's Skirts";
    if (category === "accessories") return "Accessories";
    if (category === "men") return "Men's Collection";
    if (category === "women") return "Women's Collection";
    return "All Products";
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const handleStatusChange = (status: string) => {
    setSelectedStatus(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 250]);
    setSelectedCategories([]);
    setSelectedStatus([]);
  };
  
  return (
    <div className="pt-24">
      {/* Page header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{getPageTitle()}</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Discover our premium selection of clothing and accessories
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="glass p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={300}
                  step={5}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="men" 
                      checked={selectedCategories.includes('men')}
                      onCheckedChange={() => handleCategoryChange('men')}
                    />
                    <Label htmlFor="men" className="text-sm font-medium leading-none cursor-pointer">Men</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="women" 
                      checked={selectedCategories.includes('women')}
                      onCheckedChange={() => handleCategoryChange('women')}
                    />
                    <Label htmlFor="women" className="text-sm font-medium leading-none cursor-pointer">Women</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="accessories" 
                      checked={selectedCategories.includes('accessories')}
                      onCheckedChange={() => handleCategoryChange('accessories')}
                    />
                    <Label htmlFor="accessories" className="text-sm font-medium leading-none cursor-pointer">Accessories</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Product Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="new" 
                      checked={selectedStatus.includes('new')}
                      onCheckedChange={() => handleStatusChange('new')}
                    />
                    <Label htmlFor="new" className="text-sm font-medium leading-none cursor-pointer">New Arrivals</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sale" 
                      checked={selectedStatus.includes('sale')}
                      onCheckedChange={() => handleStatusChange('sale')}
                    />
                    <Label htmlFor="sale" className="text-sm font-medium leading-none cursor-pointer">Sale</Label>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="w-full mt-6"
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="lg:w-3/4">
            {/* Mobile filters toggle */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <div>
                <span className="text-gray-500">{filteredProducts.length} products</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile filters drawer */}
      <div className={`fixed inset-0 z-50 glass lg:hidden transition-all duration-300 ${showFilters ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowFilters(false)}
            >
              <X size={24} />
            </Button>
          </div>
          
          <div className="overflow-y-auto flex-1">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <Slider
                value={priceRange}
                min={0}
                max={300}
                step={5}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mobile-men" 
                    checked={selectedCategories.includes('men')}
                    onCheckedChange={() => handleCategoryChange('men')}
                  />
                  <Label htmlFor="mobile-men" className="text-sm font-medium leading-none cursor-pointer">Men</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mobile-women" 
                    checked={selectedCategories.includes('women')}
                    onCheckedChange={() => handleCategoryChange('women')}
                  />
                  <Label htmlFor="mobile-women" className="text-sm font-medium leading-none cursor-pointer">Women</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mobile-accessories" 
                    checked={selectedCategories.includes('accessories')}
                    onCheckedChange={() => handleCategoryChange('accessories')}
                  />
                  <Label htmlFor="mobile-accessories" className="text-sm font-medium leading-none cursor-pointer">Accessories</Label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Product Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mobile-new" 
                    checked={selectedStatus.includes('new')}
                    onCheckedChange={() => handleStatusChange('new')}
                  />
                  <Label htmlFor="mobile-new" className="text-sm font-medium leading-none cursor-pointer">New Arrivals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mobile-sale" 
                    checked={selectedStatus.includes('sale')}
                    onCheckedChange={() => handleStatusChange('sale')}
                  />
                  <Label htmlFor="mobile-sale" className="text-sm font-medium leading-none cursor-pointer">Sale</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="w-1/2" onClick={resetFilters}>
              Reset
            </Button>
            <Button className="w-1/2 bg-brand-blue hover:bg-brand-blue-dark" onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
