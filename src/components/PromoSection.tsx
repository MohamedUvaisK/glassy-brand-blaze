
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Set the end date for the sale (2 weeks from now by default)
const DEFAULT_END_DATE = new Date();
DEFAULT_END_DATE.setDate(DEFAULT_END_DATE.getDate() + 14);

export default function PromoSection() {
  // Make the end date configurable through Vite's environment variable format
  const endDate = import.meta.env.VITE_PROMO_END_DATE 
    ? new Date(import.meta.env.VITE_PROMO_END_DATE) 
    : DEFAULT_END_DATE;
    
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Sale has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update the timer every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [endDate]);

  // Format the numbers to always show two digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

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
                <div className="text-4xl font-bold mb-2">{formatNumber(timeLeft.days)}</div>
                <div className="text-sm text-gray-300">Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{formatNumber(timeLeft.hours)}</div>
                <div className="text-sm text-gray-300">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{formatNumber(timeLeft.minutes)}</div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{formatNumber(timeLeft.seconds)}</div>
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
