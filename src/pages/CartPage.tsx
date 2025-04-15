
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const { toast } = useToast();
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "glassy20") {
      setPromoApplied(true);
      toast({
        title: "Promo code applied!",
        description: "You got 20% off your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please try a different code.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal - discount + shipping;
  
  if (cartItems.length === 0) {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto py-16">
            <div className="glass inline-flex p-8 rounded-full mb-6">
              <ShoppingBag size={48} className="text-brand-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-12 text-center">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart items */}
          <div className="lg:w-2/3">
            <div className="glass rounded-lg p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-6 text-sm font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id + (item.size || '') + (item.color || '')}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product info */}
                      <div className="col-span-6 flex gap-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          {item.size && item.color && (
                            <div className="text-sm text-gray-500 mt-1">
                              <span>Size: {item.size}</span>
                              <span className="ml-3">Color: {item.color}</span>
                            </div>
                          )}
                          <button 
                            className="text-red-500 text-sm flex items-center mt-2 md:hidden"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 size={14} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <div className="md:hidden text-sm text-gray-500">Price:</div>
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2">
                        <div className="md:hidden text-sm text-gray-500 mb-1">Quantity:</div>
                        <div className="flex items-center justify-center">
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-2 text-right">
                        <div className="md:hidden text-sm text-gray-500">Total:</div>
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button 
                          className="text-red-500 text-sm hidden md:flex items-center justify-end mt-2 w-full"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    <Separator className="mt-6" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button asChild variant="outline">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="glass rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (20%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md mb-6">
                <TruckIcon className="shrink-0 w-5 h-5 mt-0.5 text-brand-blue" />
                <p className="text-sm">
                  <span className="font-medium">Free shipping</span> on orders over $100
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                    className="bg-brand-blue hover:bg-brand-blue-dark"
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <div className="text-sm text-green-600">
                    Promo code "GLASSY20" applied!
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              className="w-full py-6 bg-brand-blue hover:bg-brand-blue-dark text-white text-lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
