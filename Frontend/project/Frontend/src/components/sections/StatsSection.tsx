
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 5000, label: "Farmers Connected", suffix: "+" },
  { value: 15000, label: "Hectares Analyzed", suffix: "+" },
  { value: 30, label: "Agricultural Programs", suffix: "" },
  { value: 18, label: "Indian States Covered", suffix: "" }
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-br from-agri-900 via-agri-700 to-yellow-100 text-white overflow-hidden"
    >
      {/* Glowing golden shapes in background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/30 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-yellow-500/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-agri-400/30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-yellow-600 to-agri-300 bg-clip-text text-transparent drop-shadow-lg">
          Our Impact in <span className="text-yellow-400">Numbers</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="flex flex-col items-center text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-yellow-400 shadow-lg hover:shadow-yellow-400/40 transition-all duration-500 group relative"
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:shadow-[0_0_32px_8px_rgba(253,224,71,0.35)] transition-all duration-500" />
              <CountUp
                start={0}
                end={stat.value}
                duration={2}
                isVisible={isVisible}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-600 to-agri-300 bg-clip-text text-transparent drop-shadow-lg"
              />
              <p className="text-agri-100 mt-2 text-lg font-semibold tracking-wide drop-shadow-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CountUpProps {
  start: number;
  end: number;
  duration: number;
  isVisible: boolean;
  suffix: string;
  className?: string;
}

function CountUp({ start, end, duration, isVisible, suffix, className = "" }: CountUpProps) {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / (duration * 1000), 1);
      
      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progressPercent);
      
      const currentCount = Math.floor(start + easedProgress * (end - start));
      setCount(currentCount);
      
      if (progressPercent < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [start, end, duration, isVisible]);
  
  return <div className={className}>{count}{suffix}</div>;
}
