import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  Activity, 
  LayoutDashboard, 
  Leaf, 
  CloudSun, 
  MessageSquare, 
  BarChart2, 
  Users, 
  Settings,
  Bell,
  Search,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Zap,
  Target,
  Sprout,
  Sun,
  Droplets,
  Thermometer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    id: "dashboard",
    title: "Dashboard Home",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "Realtimeprediction",
    title: "Realtime Prediction",
    icon: Activity,
    path: "/dashboard/Realtimeprediction",
  },
  {
    id: "DiseasePrediction",
    title: "Disease Prediction",
    icon: AlertTriangle,
    path: "/dashboard/DiseasePrediction",
  },
  {
    id: "CropPrediction",
    title: "Crop Prediction",
    icon: Leaf,
    path: "/dashboard/CropPrediction",
  },
  {
    id: "Weather",
    title: "Weather Forecast",
    icon: CloudSun,
    path: "/dashboard/Weather",
  },
  {
    id: "AIAssistant",
    title: "AI Assistant",
    icon: MessageSquare,
    path: "/dashboard/AIAssistant",
  },
  {
    id: "CropProductionPrediction",
    title: "Crop Production Prediction",
    icon: BarChart2,
    path: "/dashboard/CropProductionPrediction",
  },
  {
    id: "Community",
    title: "Community",
    icon: Users,
    path: "/dashboard/Community",
  },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [user, setUser] = useState({ name: "John Farmer", email: "john@krishi.com" });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://kirshiconnect-backend.onrender.com/api/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include session cookies
        });

        const data = await response.json();
        if (response.ok && data.user) {
          setUser({ name: data.user.name, email: data.user.email });
        } else {
          console.warn("Failed to fetch user data:", data.msg);
          // Fallback to localStorage if session fetch fails
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    fetchUserData();
  }, []);

  {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <Link
  to="/dashboard/Realtimeprediction"
  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
>
  <Activity className="h-5 w-5 text-agri-500" />
  {isSidebarOpen && <span>Realtimeprediction</span>}
</Link>
            <Link
              to="/dashboard/DiseasePrediction"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <LayoutDashboard className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>DiseasePrediction</span>}
            </Link>
            <Link
              to="/dashboard/CropPrediction"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <Leaf className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Crop Prediction</span>}
            </Link>
            <Link
              to="/dashboard/Weather"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <CloudSun className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Weather Forecast</span>}
            </Link>
            <Link
              to="/dashboard/AIAssistant"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <MessageSquare className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>AI Assistant</span>}
            </Link>
            <Link
              to="/dashboard/CropProductionPrediction"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <BarChart2 className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Crop Production Prediction</span>}
            </Link>
            <Link
              to="/dashboard/Community"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-agri-50 hover:text-agri-600 rounded-lg font-medium"
            >
              <Users className="h-5 w-5 text-agri-500" />
              {isSidebarOpen && <span>Community</span>}
            </Link>
          </nav>

  const DashboardHome = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white">Welcome to KrishiConnect</h1>
            <p className="text-green-100 text-lg">Your comprehensive agricultural management dashboard</p>
            <div className="flex gap-4 mt-6">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg">
                <BarChart2 className="w-4 h-4 mr-2" />
                View Reports
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg">
                <Zap className="w-4 h-4 mr-2" />
                Start Prediction
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80" alt="Agriculture Dashboard" className="w-full h-64 object-cover rounded-xl shadow-lg" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Active Predictions</p>
                <p className="text-3xl font-bold text-green-600">24</p>
                <p className="text-sm text-green-500 mt-1">+12%</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Healthy Crops</p>
                <p className="text-3xl font-bold text-green-600">1,247</p>
                <p className="text-sm text-green-500 mt-1">+8%</p>
              </div>
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Sprout className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Weather Alerts</p>
                <p className="text-3xl font-bold text-green-600">3</p>
                <p className="text-sm text-red-500 mt-1">-2</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <CloudSun className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">Community Members</p>
                <p className="text-3xl font-bold text-green-600">8,932</p>
                <p className="text-sm text-green-500 mt-1">+156</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80" alt="Farmer Success" className="w-full h-full object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Farmer Success Stories</h3>
            <p className="text-gray-600 mb-4">Real farmers, real results</p>
            <p className="text-sm text-gray-500">Discover how farmers are transforming their agricultural practices with KrishiConnect.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img src="https://plus.unsplash.com/premium_photo-1667511056107-41311df83c46?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Smart Agriculture" className="w-full h-full object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Agriculture</h3>
            <p className="text-gray-600 mb-4">AI-powered farming solutions</p>
            <p className="text-sm text-gray-500">Explore cutting-edge technology that's revolutionizing modern agriculture.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1634497140517-5c57a456cbd4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Crop Diversity" className="w-full h-full object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Crop Diversity</h3>
            <p className="text-gray-600 mb-4">Multiple crop management</p>
            <p className="text-sm text-gray-500">Manage diverse crop portfolios with intelligent monitoring and predictions.</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Activity className="w-5 h-5 text-green-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Crop health analysis completed</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <CloudSun className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Weather forecast updated</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Disease detected in Field A</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
              <Badge className="bg-red-100 text-red-800 border-red-200">Alert</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Zap className="w-5 h-5 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="h-auto p-6 flex flex-col gap-3 bg-green-50 hover:bg-green-100 border border-green-200 text-green-800 hover:text-green-900">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-sm font-semibold">Analyze Crop</span>
            </Button>
            
            <Button className="h-auto p-6 flex flex-col gap-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 hover:text-blue-900">
              <CloudSun className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-semibold">Check Weather</span>
            </Button>
            
            <Button className="h-auto p-6 flex flex-col gap-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 hover:text-purple-900">
              <MessageSquare className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-semibold">Ask AI</span>
            </Button>
            
            <Button className="h-auto p-6 flex flex-col gap-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-800 hover:text-yellow-900">
              <BarChart2 className="w-8 h-8 text-yellow-600" />
              <span className="text-sm font-semibold">View Reports</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Insights */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Today's Agricultural Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <Thermometer className="w-6 h-6 text-green-600" />
              <span className="text-lg font-semibold text-green-800">Temperature</span>
            </div>
            <p className="text-3xl font-bold text-green-900 mb-1">28°C</p>
            <p className="text-sm text-green-700">Optimal for wheat growth</p>
          </div>
          
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-800">Humidity</span>
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">65%</p>
            <p className="text-sm text-blue-700">Good moisture levels</p>
          </div>
          
          <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-6 h-6 text-orange-600" />
              <span className="text-lg font-semibold text-orange-800">UV Index</span>
            </div>
            <p className="text-3xl font-bold text-orange-900 mb-1">6.2</p>
            <p className="text-sm text-orange-700">Moderate exposure</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeRoute) {
      case "dashboard":
        return <DashboardHome />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-br from-green-600 via-green-500 to-green-700 border-r border-green-400/30 ${isSidebarOpen ? "w-72" : "w-20"} hidden md:block transition-all duration-300 relative backdrop-blur-xl`}
        style={{ boxShadow: "none" }}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-green-400/30 bg-green-800/20">
            <div className="flex items-center justify-between">
              {isSidebarOpen ? (
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-lg border-4 border-green-400" style={{ boxShadow: "0 0 16px 4px #22c55e" }}>
                    {/* Logo image: replace 'logoPath' with your image path variable */}
                    <img src={"https://i.postimg.cc/1zJ91KM4/Krishi-Connect-Logo.png"} alt="KrishiConnect Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 bg-clip-text text-transparent" style={{ textShadow: "0 0 8px #FFD700, 0 0 2px #FFD700" }}>
                      KrishiConnect
                    </h2>
                    <p className="text-xs text-green-100">Agricultural Platform</p>
                  </div>
                </Link>
              ) : (
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-lg mx-auto border-4 border-green-400" style={{ boxShadow: "0 0 16px 4px #22c55e" }}>
                  {/* Logo image: replace 'logoPath' with your image path variable */}
                  <img src={"https://i.postimg.cc/1zJ91KM4/Krishi-Connect-Logo.png"} alt="KrishiConnect Logo" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <Button onClick={toggleSidebar} variant="ghost" size="sm" className="mt-4 w-full text-green-100 hover:bg-green-700/50 hover:text-white transition-all">
              {isSidebarOpen ? (<><ChevronLeft className="w-4 h-4 mr-2" />Collapse</>) : (<ChevronRight className="w-4 h-4" />)}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              item.id === "dashboard" ? (
                <button
                  key={item.id}
                  onClick={() => setActiveRoute(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200 ${activeRoute === item.id ? "bg-green-800/40 text-white border-l-4 border-green-300" : "text-green-100 hover:bg-green-700/50 hover:text-white"} ${!isSidebarOpen ? "justify-center" : ""}`}
                  style={{ position: "relative" }}
                  title={!isSidebarOpen ? item.title : undefined}
                >
                  <item.icon className={`w-5 h-5 ${activeRoute === item.id ? "text-white" : "text-green-200"}`} />
                  {isSidebarOpen && (<span className="text-sm">{item.title}</span>)}
                  {!isSidebarOpen && (<span className="absolute left-full ml-2 px-2 py-1 rounded bg-green-800 text-green-100 text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">{item.title}</span>)}
                </button>
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200 text-green-100 hover:bg-green-700/50 hover:text-white ${!isSidebarOpen ? "justify-center" : ""}`}
                  style={{ position: "relative", textDecoration: "none" }}
                  title={!isSidebarOpen ? item.title : undefined}
                >
                  <item.icon className="w-5 h-5 text-green-200" />
                  {isSidebarOpen && (<span className="text-sm">{item.title}</span>)}
                  {!isSidebarOpen && (<span className="absolute left-full ml-2 px-2 py-1 rounded bg-green-800 text-green-100 text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">{item.title}</span>)}
                </Link>
              )
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-green-400/30 bg-green-800/20">
            <button
              onClick={() => setActiveRoute("settings")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200 ${activeRoute === "settings" ? "bg-green-800/40 text-white border-l-4 border-green-300" : "text-green-100 hover:bg-green-700/50 hover:text-white"}`}
            >
              <Settings className={`w-5 h-5 ${activeRoute === "settings" ? "text-white" : "text-green-200"}`} />
              {isSidebarOpen && <span className="text-sm">Settings</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-center p-4">
            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none transition-all">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm border border-green-200">
                <img src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=100&q=80" alt="KrishiConnect Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold text-green-600">KrishiConnect</span>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center flex-1 mx-8">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Side Items */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-green-600 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-gray-100">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 shadow-lg">
                  <div className="p-3 bg-gray-50 rounded-t-lg">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer transition-all hover:bg-gray-50">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer transition-all hover:bg-gray-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 transition-all hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50">
            <div className="fixed inset-y-0 left-0 w-80 bg-gradient-to-br from-green-600 via-green-500 to-green-700 shadow-xl transform transition-all">
              <div className="p-6 border-b border-green-400/30">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=100&q=80"
                        alt="KrishiConnect Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">KrishiConnect</h2>
                      <p className="text-xs text-green-100">Agricultural Platform</p>
                    </div>
                  </Link>
                  <button onClick={toggleMobileMenu} className="text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${
                      activeRoute === item.id
                        ? "bg-green-800/40 text-white border-l-4 border-green-300"
                        : "text-green-100 hover:bg-green-700/50 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="fixed inset-0 z-[-1]" onClick={toggleMobileMenu}></div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
          <Outlet />
        </main>
      </div>
    </div>
  );
}