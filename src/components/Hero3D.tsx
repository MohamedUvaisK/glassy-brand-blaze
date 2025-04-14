
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setRotate({
        x: y * 10, // Reversed for correct rotation direction
        y: x * 10,
      });
    };
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
  
  return (
    <div ref={heroRef} className="scene-container w-full h-[90vh] bg-gradient-to-br from-gray-900 to-black flex items-center relative overflow-hidden">
      {/* 3D elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-brand-blue to-purple-500 blur-3xl opacity-20"
          style={{ 
            top: '20%', 
            left: '60%',
            transform: `translate(-50%, -50%) rotate3d(${rotate.x}, ${rotate.y}, 0, ${Math.sqrt(rotate.x * rotate.x + rotate.y * rotate.y)}deg)`
          }}
        ></div>
        <div 
          className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-pink-500 to-brand-blue blur-3xl opacity-10"
          style={{ 
            top: '70%', 
            left: '30%',
            transform: `translate(-50%, -50%) rotate3d(${-rotate.x}, ${-rotate.y}, 0, ${Math.sqrt(rotate.x * rotate.x + rotate.y * rotate.y)}deg)`
          }}
        ></div>
      </div>
      
      {/* Content layer */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-white mb-12 md:mb-0">
          <h1 
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ 
              transform: `translateZ(75px) perspective(1000px) rotateX(${rotate.x * 0.2}deg) rotateY(${rotate.y * 0.2}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <span className="block">Elevate Your</span>
            <span className="text-brand-blue">Style Game</span>
          </h1>
          <p 
            className="text-xl text-gray-300 mb-8 max-w-lg"
            style={{ 
              transform: `translateZ(50px) perspective(1000px) rotateX(${rotate.x * 0.1}deg) rotateY(${rotate.y * 0.1}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
          >
            Discover our premium collection designed for those who appreciate quality, style, and the fine details that make fashion extraordinary.
          </p>
          <div 
            className="flex flex-wrap gap-4"
            style={{ 
              transform: `translateZ(25px) perspective(1000px) rotateX(${rotate.x * 0.05}deg) rotateY(${rotate.y * 0.05}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Button asChild className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-6 rounded-md">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 rounded-md">
              <Link to="/products?tag=new">New Arrivals</Link>
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          <div 
            className="relative"
            style={{ 
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1000&auto=format&fit=crop"
              alt="Fashion model" 
              className="rounded-lg shadow-2xl max-w-full h-auto"
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
            />
            <div 
              className="absolute -bottom-10 -right-10 glass p-6 rounded-lg shadow-xl max-w-xs"
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(75px)' }}
            >
              <h3 className="text-xl font-bold mb-2 text-white">Summer Collection 2025</h3>
              <p className="text-gray-300">Limited edition pieces now available</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-[pulse_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
