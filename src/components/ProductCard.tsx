
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    hoverImage?: string;
    category: string;
    isNew?: boolean;
    isSale?: boolean;
    discountPrice?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const displayImage = isHovered && product.hoverImage ? product.hoverImage : product.image;
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      quantity: 1,
      image: product.image
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} added to your cart.`,
    });
  };
  
  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Link to={`/products/${product.id}`}>
          <img 
            src={displayImage} 
            alt={product.name} 
            className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Product badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="glass px-3 py-1 text-xs font-semibold text-white rounded">New</span>
          )}
          {product.isSale && (
            <span className="bg-red-500 px-3 py-1 text-xs font-semibold text-white rounded">Sale</span>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="glass flex rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent hover:bg-white/20 text-white h-10 w-10 rounded-none"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={18} 
                className={isFavorite ? "fill-red-500 text-red-500" : ""}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent hover:bg-white/20 text-white h-10 w-10 rounded-none"
              onClick={handleQuickAdd}
            >
              <ShoppingBag size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      <Link to={`/products/${product.id}`} className="block">
        <h3 className="font-medium text-lg mb-1 group-hover:text-brand-blue transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-red-500 font-semibold">${product.discountPrice.toFixed(2)}</span>
              <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
