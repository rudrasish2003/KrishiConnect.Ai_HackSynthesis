import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "mr", name: "मराठी (Marathi)" },
];

// List of navigation items with their corresponding section IDs
const navItems = [
  { name: "Home", path: "/", sectionId: "home" },
  { name: "Features", path: "/features", sectionId: "features" },
  { name: "About", path: "/about", sectionId: "about" },
  { name: "Programs", path: "/programs", sectionId: "programs" },
  { name: "Contact", path: "/contact", sectionId: "contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsMenuOpen(false);
      section.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  // Function to handle navigation link clicks
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // Update active section and navbar visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let foundSection = "home";
      for (const item of navItems) {
        const section = document.getElementById(item.sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition + 100 >= offsetTop &&
            scrollPosition + 100 < offsetTop + offsetHeight
          ) {
            foundSection = item.sectionId;
            break;
          }
        }
      }
      setActiveSection(foundSection);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-black/70 backdrop-blur-lg border-b border-yellow-500 shadow-lg transition-all duration-500"
      style={{ transition: "opacity 0.5s, background 0.5s" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
  <Link 
    to="/" 
    className="flex items-center gap-2"
    onClick={() => setIsMenuOpen(false)}
  >
    {/* Logo Image */}
    <span className="rounded-full border-2 border-green-400 shadow-lg" style={{ boxShadow: '0 0 12px 2px #22c55e' }}>
      <img 
        src="src/Images/KrishiConnect Logo.png" 
        alt="KrishiConnect Logo" 
        className="w-10 h-10 object-contain rounded-full"
      />
    </span>
    {/* App Name */}
    <span
      className="text-2xl font-bold"
      style={{
        background: 'linear-gradient(90deg, #22c55e 0%, #bfa23a 50%, #ffd700 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: '#bfa23a',
        textShadow: '0 1px 3px #22c55e, 0 0 1px #ffd700',
        filter: 'drop-shadow(0 0 1px #22c55e)',
        fontWeight: 800,
        letterSpacing: '1px',
        display: 'inline-block',
      }}
    >
      KrishiConnect
    </span>
  </Link>
</div>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              if (item.name === "Home") {
                return (
                  <Link
                    key={item.sectionId}
                    to={item.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      activeSection === item.sectionId
                        ? "text-yellow-400 border-b-2 border-yellow-500 bg-black/30"
                        : "text-yellow-300 hover:text-green-400 hover:bg-black/40"
                    }`}
                    style={{ fontWeight: 600 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.sectionId}
                    href={`#${item.sectionId}`}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      activeSection === item.sectionId
                        ? "text-yellow-400 border-b-2 border-yellow-500 bg-black/30"
                        : "text-yellow-300 hover:text-green-400 hover:bg-black/40"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {item.name}
                  </a>
                );
              }
            })}
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-yellow-300 hover:text-green-400 transition-colors px-3 py-2 text-sm font-medium">
                <Globe className="h-4 w-4" />
                <span>{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border border-yellow-500">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang)}
                    className="cursor-pointer text-yellow-300 hover:text-green-400 hover:bg-black/60"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline" size="sm" className="border-green-500 text-yellow-300 hover:text-green-400 hover:bg-black/40">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-black/60 border border-green-500 text-yellow-300 hover:text-green-400 hover:bg-black/80">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Switcher (Mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2">
                <Globe className="h-5 w-5 text-gray-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border border-yellow-500">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang)}
                    className="cursor-pointer text-yellow-300 hover:text-green-400 hover:bg-black/60"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Auth Button (Mobile) */}
            <Button asChild size="icon" variant="ghost">
              <Link to="/login">
                <User className="h-5 w-5 text-gray-700" />
              </Link>
            </Button>
            
            {/* Menu Toggle */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-agri-600 hover:bg-agri-50 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-in-bottom">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              if (item.name === "Home") {
                return (
                  <Link
                    key={item.sectionId}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri-600 hover:bg-agri-50 ${
                      activeSection === item.sectionId ? "bg-agri-50 text-agri-600" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.sectionId}
                    href={`#${item.sectionId}`}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri-600 hover:bg-agri-50 ${
                      activeSection === item.sectionId ? "bg-agri-50 text-agri-600" : ""
                    }`}
                    onClick={(e) => handleNavClick(e, item.sectionId)}
                  >
                    {item.name}
                  </a>
                );
              }
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 px-4">
              <Button asChild variant="outline" className="w-full border-green-500 text-yellow-300 hover:text-green-400 hover:bg-black/40">
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </Button>
              <Button asChild className="w-full bg-black/60 border border-green-500 text-yellow-300 hover:text-green-400 hover:bg-black/80">
                <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
