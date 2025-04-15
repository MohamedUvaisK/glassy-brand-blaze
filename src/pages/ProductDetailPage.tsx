
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, Heart, Minus, Plus, Share, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";

// Sample product data - in a real app this would come from an API
const allProducts = [
  {
    id: "1",
    name: "Premium Cotton Henley Shirt",
    price: 49.99,
    discountPrice: null,
    description: "Our Premium Cotton Henley Shirt is crafted from 100% organic cotton, offering exceptional comfort and breathability. The classic henley design with a three-button placket adds a touch of casual sophistication to your everyday wardrobe.",
    details: [
      "100% organic cotton",
      "Regular fit",
      "Three-button placket",
      "Ribbed cuffs",
      "Machine washable"
    ],
    features: [
      "Breathable fabric ideal for all-day wear",
      "Eco-friendly manufacturing process",
      "Durable construction for long-lasting quality",
      "Available in multiple colors",
      "Versatile style for casual or smart-casual occasions"
    ],
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565115021788-6d3f1ede4980?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589831494949-63d77bce6d5d?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Gray"],
    category: "men",
    subcategory: "shirts",
    isNew: true,
    isSale: false,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop", // Added for ProductCard component
    hoverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop" // Added for ProductCard component
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 59.99,
    discountPrice: null,
    description: "These slim fit jeans are designed for modern style and comfort. Made from high-quality denim with just the right amount of stretch, they offer a perfect fit that maintains its shape throughout the day.",
    details: [
      "98% cotton, 2% elastane",
      "Slim fit",
      "Five-pocket styling",
      "Button and zip closure",
      "Machine washable"
    ],
    features: [
      "High-quality denim with comfortable stretch",
      "Timeless design for versatile styling",
      "Reinforced stitching for durability",
      "Eco-friendly washing process",
      "Comfortable waistband design"
    ],
    images: [
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541840031508-7856a9a402f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Blue", "Black", "Gray", "Light Blue"],
    category: "men",
    subcategory: "pants",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop", // Added for ProductCard component
    hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop" // Added for ProductCard component
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 79.99,
    discountPrice: null,
    description: "This floral summer dress is perfect for warm days and special occasions. The lightweight fabric drapes beautifully while the vibrant floral pattern adds a touch of elegance to your summer wardrobe.",
    details: [
      "100% rayon",
      "Flowy A-line silhouette",
      "Adjustable straps",
      "Lined bodice",
      "Machine washable"
    ],
    features: [
      "Breathable lightweight fabric for hot days",
      "Versatile design for casual or dressy occasions",
      "Vibrant pattern that resists fading",
      "Comfortable fit with gentle elastic at back",
      "Side pockets for practicality"
    ],
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618244972963-dbad6cf64b21?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623091410901-00e2d268901f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Print", "Blue Floral", "Red Floral"],
    category: "women",
    subcategory: "dresses",
    isNew: true,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=800&auto=format&fit=crop", // Added for ProductCard component
    hoverImage: "https://images.unsplash.com/photo-1618244972963-dbad6cf64b21?q=80&w=800&auto=format&fit=crop" // Added for ProductCard component
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Find the product by ID
  const product = allProducts.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // If product not found, navigate to 404
  useEffect(() => {
    if (!product && id) {
      navigate('/not-found');
    }
  }, [product, id, navigate]);
  
  // Reset state when product changes
  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    setIsWishlisted(false);
  }, [id]);
  
  if (!product) {
    return (
      <div className="pt-24 container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')} className="mt-4">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      quantity: quantity,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedColor}, ${selectedSize}) x ${quantity}`,
    });
  };
  
  // Similar products filtering (exclude current product and limit to 4)
  const similarProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product images */}
          <div className="lg:w-1/2">
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden cursor-pointer ${index === selectedImage ? 'ring-2 ring-brand-blue' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div className="lg:w-1/2">
            {/* Product badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="bg-brand-blue text-white px-3 py-1 text-xs font-semibold rounded">New</span>
              )}
              {product.isSale && (
                <span className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded">Sale</span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-red-500">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            {/* Size selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Size</h3>
                <button className="text-sm text-brand-blue flex items-center">
                  Size Guide <ChevronDown size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                      selectedSize === size
                        ? 'border-brand-blue bg-brand-blue text-white'
                        : 'border-gray-300 hover:border-brand-blue'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color selection */}
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Color: {selectedColor}</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded-full border ${
                      selectedColor === color
                        ? 'ring-2 ring-brand-blue ring-offset-2'
                        : ''
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      border: color.toLowerCase() === "white" ? "1px solid #e5e7eb" : "none"
                    }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Color ${color}`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Quantity and add to cart */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="glass flex items-center rounded-md overflow-hidden">
                <button
                  className="w-12 h-12 flex items-center justify-center text-white"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <div className="w-12 h-12 flex items-center justify-center text-white font-medium">
                  {quantity}
                </div>
                <button
                  className="w-12 h-12 flex items-center justify-center text-white"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <Button
                className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white h-12"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 border-gray-300"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={isWishlisted ? "fill-red-500 text-red-500" : ""} size={18} />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 border-gray-300"
              >
                <Share size={18} />
              </Button>
            </div>
            
            {/* Shipping info */}
            <div className="glass p-4 rounded-lg mb-8">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 mt-1 text-brand-blue" />
                <div>
                  <p className="font-medium">Free shipping</p>
                  <p className="text-sm text-gray-600">Free standard shipping on orders over $100</p>
                </div>
              </div>
            </div>
            
            {/* Product details accordion */}
            <Accordion type="single" collapsible className="glass rounded-lg overflow-hidden">
              <AccordionItem value="details">
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-white/10">
                  <span className="text-lg font-medium">Details</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <ul className="list-disc list-inside space-y-1">
                    {product.details.map((detail, index) => (
                      <li key={index} className="text-gray-600">{detail}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-white/10">
                  <span className="text-lg font-medium">Shipping & Returns</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <p className="text-gray-600 mb-2">
                    Free standard shipping on orders over $100. Expedited shipping options available at checkout.
                  </p>
                  <p className="text-gray-600">
                    Returns accepted within 30 days of delivery. Items must be unworn and in original packaging.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Additional information tabs */}
        <div className="mt-16 mb-12 glass rounded-lg p-6">
          <Tabs defaultValue="features">
            <TabsList className="bg-white/10 mb-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="care">
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Care Instructions</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-gray-600">Machine wash cold with like colors</li>
                  <li className="text-gray-600">Do not bleach</li>
                  <li className="text-gray-600">Tumble dry low</li>
                  <li className="text-gray-600">Warm iron if needed</li>
                  <li className="text-gray-600">Do not dry clean</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <p className="text-gray-600">No reviews yet. Be the first to write a review!</p>
                <Button className="mt-4 bg-brand-blue hover:bg-brand-blue-dark">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar products */}
        {similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
