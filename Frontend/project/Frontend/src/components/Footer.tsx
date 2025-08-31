
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Blurred farming image background */}
      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"
        alt="Farming field background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-lg scale-105 pointer-events-none z-0"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-agri-900 to-yellow-900 opacity-90 z-10" />
      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              {/* Circular logo container with glowing green border */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-4 border-green-500 shadow-[0_0_16px_4px_rgba(34,197,94,0.5)] animate-pulse">
                <img
                  src="src/Images/KrishiConnect Logo.png"
                  alt="KrishiConnect Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Brand Name */}
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">KrishiConnect</span>
            </Link>
            <p className="text-yellow-200 mb-6">
              Empowering farmers with <span className="text-green-300">cutting-edge technology</span> for sustainable and profitable agriculture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-yellow-400 hover:text-green-400 transform hover:scale-110 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-yellow-400 hover:text-green-400 transform hover:scale-110 transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-yellow-400 hover:text-green-400 transform hover:scale-110 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-yellow-400 hover:text-green-400 transform hover:scale-110 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-yellow-200 hover:text-green-300 hover:translate-x-1 transition-all inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#features" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#programs" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="#testimonials" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">Our Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features/soil-analysis" className="text-yellow-200 hover:text-green-300 hover:translate-x-1 transition-all inline-block">
                  Soil Analysis & Recommendations
                </Link>
              </li>
              <li>
                <Link to="/features/disease-prediction" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Disease Prediction & Prevention
                </Link>
              </li>
              <li>
                <Link to="/features/chatbot" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  AI Chatbot Assistant
                </Link>
              </li>
              <li>
                <Link to="/features/weather" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Weather Forecasting
                </Link>
              </li>
              <li>
                <Link to="/features/community" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Farmer Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-agri-400 flex-shrink-0 mt-1" size={18} />
                <span className="text-yellow-200">
                  123 Agriculture Way, Farming District, New Delhi, 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-agri-400 flex-shrink-0" size={18} />
                <a href="tel:+919876543210" className="text-yellow-200 hover:text-green-300">
                  +91 9876 543 210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-agri-400 flex-shrink-0" size={18} />
                <a href="mailto:info@KrishiConnect.com" className="text-yellow-200 hover:text-green-300">
                  info@KrishiConnect.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-yellow-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} <span className="text-green-300">The Debuggers</span>. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-yellow-400">
            <a href="#" className="hover:text-green-300">Privacy Policy</a>
            <a href="#" className="hover:text-green-300">Terms of Service</a>
            <a href="#" className="hover:text-green-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
