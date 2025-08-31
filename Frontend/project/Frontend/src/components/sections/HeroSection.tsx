import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Leaf, Users, TrendingUp } from "lucide-react";
const images = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", // Rice paddy fields
  "https://images.unsplash.com/photo-1681226298721-88cdb4096e5f?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1713952160141-8364b2fca485?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop", // Mountain farming
  "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2070&auto=format&fit=crop", // Farmer in field
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2069&auto=format&fit=crop", // Tea plantation

  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop", // Farmers working
  "https://plus.unsplash.com/premium_photo-1661937748634-7f49fec9da14?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Agricultural landscape
  "https://plus.unsplash.com/premium_photo-1682092642861-742c2a19d652?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Farming community
  "https://images.unsplash.com/photo-1594012409831-50ab9fcb37e9?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian farmer
  "https://plus.unsplash.com/premium_photo-1661811354767-00d1198acd01?q=80&w=1231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian agriculture
  "https://images.unsplash.com/photo-1738334348990-2a40eebc618f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Indian crops
];

const stats = [
  { icon: Users, value: "50,000+", label: "Farmers Connected", delay: "0s" },
  { icon: TrendingUp, value: "35%", label: "Yield Increase", delay: "0.2s" },
  { icon: Leaf, value: "25+", label: "States Covered", delay: "0.4s" },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Slower transition for more cinematic effect
    
    return () => clearInterval(interval);
  }, []);

  return (
  <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-0 mt-0">
      {/* Background Image Slider with Smooth Fading */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat hero-image-fade ${
              index === currentImageIndex ? 'active' : 'inactive'
            }`}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden={index !== currentImageIndex}
          />
        ))}
        {/* Hero Overlay */}
        <div className="absolute inset-0 hero-overlay pointer-events-none" style={{
          background: "linear-gradient(120deg, rgba(34,197,94,0.25) 0%, rgba(255,215,0,0.25) 100%)"
        }} />
      </div>

      {/* Content */}
  <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Brand Badge */}
        <div className="mb-8 bg-gradient-to-r from-green-600 via-golden to-green-400 border border-golden text-white px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-strong animate-fade-in shadow-lg">
          🌾 Smart Agriculture Platform
        </div>
        
        {/* Main Heading */}
  <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 animate-slide-up text-shadow-lg leading-tight">
          <span className="block">KRISHI</span>
          <span
            className="block font-extrabold"
            style={{
              background: 'linear-gradient(90deg, #ffe066 0%, #ffd700 50%, #fffbe6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: '#ffd700',
              textShadow: '0 2px 8px #bfa23a, 0 0 2px #ffd700, 0 0 8px #ffd700',
              filter: 'drop-shadow(0 0 2px #ffd700)',
              border: 'none',
              padding: 0,
              display: 'inline-block',
            }}
          >
            <span style={{
              WebkitTextStroke: '2px #ffd700',
            }}>CONNECT</span>
          </span>
        </h1>
        
        {/* Subtitle */}
  <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mb-8 animate-fade-in text-shadow leading-relaxed">
          Empowering Indian farmers with <span className="text-golden font-semibold">AI-driven precision agriculture</span>,
          <br className="hidden md:block" />
          connecting tradition with <span className="text-green-400 font-semibold">technology</span> for sustainable growth
        </p>
        
        {/* CTA Buttons */}
  <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 animate-fade-in">
          <Button
            size="lg"
            variant="default"
            className="text-base py-4 px-8 group shadow-xl bg-black/80 text-[#bfa23a] font-bold border-2 border-green-600 rounded-2xl hover:bg-black/90 hover:text-yellow-400 flex items-center justify-center"
            onClick={() => window.location.href = '/login'}
          >
            Start Your Journey
            <ArrowRight className="h-5 w-5 ml-2 text-[#bfa23a] transition-transform group-hover:translate-x-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base py-4 px-8 border-2 border-green-600 text-[#bfa23a] font-bold bg-black/80 rounded-2xl shadow-xl hover:bg-black/90 hover:text-yellow-400 flex items-center justify-center"
            onClick={() => window.location.href = '/login'}
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Stats Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 p-6 bg-black/80 rounded-2xl border-2 border-green-600 shadow-2xl">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: stat.delay }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-black/90 rounded-full border-2 border-green-600 group-hover:bg-black transition-colors shadow-lg">
                  <stat.icon className="h-8 w-8" style={{ color: '#bfa23a' }} />
                </div>
              </div>
              <p className="text-xl lg:text-2xl font-extrabold mb-1 drop-shadow-lg" style={{ color: '#bfa23a' }}>{stat.value}</p>
              <p className="text-sm lg:text-base font-bold drop-shadow" style={{ color: '#bfa23a' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator - Mouse Icon perfectly between stats and next section */}
  <div className="w-full flex justify-center" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
        <button
          className="flex flex-col items-center group focus:outline-none"
          style={{ background: 'none', border: 'none' }}
          aria-label="Scroll Down"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs font-medium text-green-600 mb-1" style={{ fontSize: '0.75rem' }}>Explore More</span>
          <span className="w-7 h-12 border-2 border-green-600 rounded-full flex items-center justify-center relative group-hover:bg-black/20 transition-all">
            <span className="w-2 h-2 bg-green-600 rounded-full absolute left-1/2 top-3 transform -translate-x-1/2 animate-bounce" />
          </span>
        </button>
      </div>

  {/* Image Dots Indicator Removed */}
    </section>
  );
}