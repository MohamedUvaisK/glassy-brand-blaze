
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, Heart, Minus, Plus, Share, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";

// Mock product data - in a real app this would come from an API
const product = {
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
  isSale: false
};

// Similar products
const similarProducts = [
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
    id: "11",
    name: "Linen Button Down",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1598522325320-68d6279cffd0?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=800&auto=format&fit=crop",
    category: "men",
    subcategory: "shirts"
  },
  {
    id: "8",
    name: "Wool Overcoat",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    category: "men",
    subcategory: "jackets"
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
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
    
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedColor}, ${selectedSize}) x ${quantity}`,
    });
  };
  
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
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
