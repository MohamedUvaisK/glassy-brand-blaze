
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PromoSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2000&auto=format&fit=crop" 
          alt="Promo background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Summer Collection 2025</h2>
          <p className="text-xl mb-8 text-gray-300">Limited time offer. Get up to 50% off on selected items.</p>
          
          <div className="glass inline-block p-8 rounded-lg mb-12">
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">00</div>
                <div className="text-sm text-gray-300">Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">00</div>
                <div className="text-sm text-gray-300">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">00</div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">00</div>
                <div className="text-sm text-gray-300">Seconds</div>
              </div>
            </div>
            
            <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-md px-8 py-6">
              <Link to="/products?tag=sale">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
