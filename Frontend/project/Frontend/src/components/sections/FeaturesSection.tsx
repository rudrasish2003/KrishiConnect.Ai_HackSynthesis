import { motion } from "framer-motion";
import { Leaf, CloudSun, MessageSquare, Timer, BarChart2, Users, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Soil Analysis & Crop Recommendations",
    description:
      "Analyze NPK levels from soil samples to receive tailored recommendations for crops and fertilizers to optimize your yield.",
    link: "/features/soil-analysis",
    color: "from-agri-400 to-agri-600",
    iconBg: "bg-agri-100",
    hoverColor: "group-hover:bg-agri-500"
  },
  {
    icon: <CloudSun className="h-8 w-8" />,
    title: "Weather Forecasting & Predictions",
    description:
      "Get accurate weather forecasts and real-time soil condition data to make informed decisions for your farming activities.",
    link: "/features/weather",
    color: "from-sky-200 to-agri-400",
    iconBg: "bg-sky-100",
    hoverColor: "group-hover:bg-sky-300"
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "AI-Powered Agricultural Assistant",
    description:
      "Access our intelligent chatbot for instant guidance on farming techniques, crop diseases, and best practices.",
    link: "/features/chatbot",
    color: "from-earth-300 to-agri-500",
    iconBg: "bg-earth-100",
    hoverColor: "group-hover:bg-earth-400"
  },
  {
    icon: <Timer className="h-8 w-8" />,
    title: "Growth & Income Calculation",
    description:
      "Time series models analyze your soil, weather, and crop data to calculate expected growth and yearly income predictions.",
    link: "/features/growth-calculator",
    color: "from-agri-300 to-earth-400",
    iconBg: "bg-agri-200",
    hoverColor: "group-hover:bg-agri-400"
  },
  {
    icon: <BarChart2 className="h-8 w-8" />,
    title: "Disease Prediction & Prevention",
    description:
      "Our GenAI technology identifies potential crop diseases before they appear and suggests prevention strategies.",
    link: "/features/disease-prediction",
    color: "from-earth-200 to-agri-600",
    iconBg: "bg-earth-200",
    hoverColor: "group-hover:bg-earth-300"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Farmer Community",
    description:
      "Connect with other farmers to share knowledge, experiences, and insights for better agricultural practices.",
    link: "/features/community",
    color: "from-agri-200 to-sky-300",
    iconBg: "bg-sky-200",
    hoverColor: "group-hover:bg-sky-200"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background with organic shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-agri-50 via-earth-100 to-sky-100">
        <div className="absolute top-20 left-10 w-72 h-72 bg-agri-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-earth-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-agri-400/20 rounded-full"
            initial={{ 
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200, 
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              scale: 0
            }}
            animate={{ 
              y: [0, -20, 20, -10],
              scale: [0, 1, 0.5, 1],
              opacity: [0, 1, 0.5, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-agri-200/50 mb-6">
            <Sparkles className="h-4 w-4 text-agri-500" />
            <span className="text-sm font-medium text-agri-700">Smart Agriculture Solutions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-agri-600 via-earth-500 to-agri-500 bg-clip-text text-transparent leading-tight">
            Our Smart Features
          </h2>
          <p className="text-lg md:text-xl text-agri-700 max-w-4xl mx-auto leading-relaxed">
            KrishiConnect uses cutting-edge technology to revolutionize farming practices,
            making agriculture more sustainable, profitable, and efficient.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow: "0 0 32px 8px rgba(34,197,94,0.35)",
                transition: { duration: 0.4 }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              {/* Card background with blurred farming Unsplash image and glowing effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" 
                  alt="Farming field" 
                  className="w-full h-full object-cover blur-md scale-105 opacity-80 group-hover:blur-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-300/40 to-green-600/40 group-hover:from-green-400/60 group-hover:to-green-600/60 transition-all duration-500" />
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 pointer-events-none transition-all duration-500 rounded-2xl group-hover:shadow-[0_0_32px_8px_rgba(34,197,94,0.35)] group-hover:border-4 group-hover:border-green-400" />
              </div>
              {/* Main card */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-500 overflow-hidden transition-shadow duration-500 group-hover:border-green-400 group-hover:border-4" style={{ boxShadow: '0 0 0 8px rgba(34,197,94,0.10)' }}>
                {/* Top corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-agri-100/50 to-transparent rounded-bl-3xl"></div>
                {/* Animated background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-2xl`}></div>
                {/* Sparkle effect */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute top-4 right-4 text-agri-400/40"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                <div className="relative z-10">
                  {/* Icon container */}
                  <motion.div 
                    className={`mb-6 p-4 ${feature.iconBg} inline-flex rounded-2xl text-green-600 group-hover:text-green-700 transition-all duration-700 ease-in-out group-hover:scale-110`}
                    whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.7, ease: "easeInOut" } }}
                  >
                    {feature.icon}
                  </motion.div>
                  {/* Content */}
                  <motion.h3 
                    className="text-xl font-bold mb-4 text-agri-800 group-hover:text-agri-900 transition-colors duration-700 ease-in-out"
                    whileHover={{ scale: 1.08, transition: { duration: 0.7, ease: "easeInOut" } }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-agri-600 group-hover:text-agri-700 mb-6 leading-relaxed transition-colors duration-700 ease-in-out"
                    whileHover={{ scale: 1.05, transition: { duration: 0.7, ease: "easeInOut" } }}
                  >
                    {feature.description}
                  </motion.p>
                  {/* Learn more link */}
                  <motion.a
                    href={feature.link}
                    className="inline-flex items-center gap-2 text-agri-600 group-hover:text-agri-800 font-semibold transition-all duration-700 ease-in-out"
                    whileHover={{ x: 4, transition: { duration: 0.7, ease: "easeInOut" } }}
                  >
                    Learn more 
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.a>
                </div>
                {/* Bottom corner decoration */}
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-earth-100/30 to-transparent rounded-tr-3xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}