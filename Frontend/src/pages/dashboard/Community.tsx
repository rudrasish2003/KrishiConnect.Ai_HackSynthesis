import { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Camera, MapPin, Hash, Globe, Users, TrendingUp, Calendar, Plus, Menu, Search, Bell, Home, UserPlus, Crop, Leaf, Sun, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Unsplash agriculture images
const heroImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
const tomatoesFarm = 'https://images.unsplash.com/photo-1701582015954-381d510b34ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const wheatField ='https://images.unsplash.com/photo-1671456244663-dabea96e1429?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const smartIrrigation = 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
import CommentModal from './CommentModal';
import ShareModal from './ShareModal';

// Interfaces
interface User {
  id: string;
  name: string;
  nameHindi?: string;
  avatar: string;
  role: string;
  roleHindi?: string;
  location: string;
  followers: number;
  verified?: boolean;
}

interface Post {
  id: string;
  userId: string;
  content: string;
  contentHindi?: string;
  images?: string[];
  type: 'post' | 'blog' | 'tip';
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  timestamp: Date;
  tags: string[];
  language: 'en' | 'hi' | 'gu' | 'te';
}

// Sample users with Indian names and bilingual support
const users: Record<string, User> = {
  "user1": {
    id: "user1",
    name: "Rajesh Kumar",
    nameHindi: "राजेश कुमार", 
    avatar: "RK",
    role: "Organic Farmer",
    roleHindi: "जैविक कृषक",
    location: "Punjab, India",
    followers: 1250,
    verified: true
  },
  "user2": {
    id: "user2",
    name: "Priya Sharma",
    nameHindi: "प्रिया शर्मा",
    avatar: "PS",
    role: "Agricultural Expert",
    roleHindi: "कृषि विशेषज्ञ",
    location: "Haryana, India", 
    followers: 2840,
    verified: true
  },
  "user3": {
    id: "user3",
    name: "Mohan Patel",
    nameHindi: "मोहन पटेल",
    avatar: "MP",
    role: "Smart Farming Advocate",
    roleHindi: "स्मार्ट कृषि समर्थक",
    location: "Gujarat, India",
    followers: 980,
  },
  "user4": {
    id: "user4",
    name: "Lakshmi Reddy",
    nameHindi: "लक्ष्मी रेड्डी",
    avatar: "LR",
    role: "Sustainable Agriculture",
    roleHindi: "टिकाऊ कृषि",
    location: "Andhra Pradesh, India",
    followers: 1670,
  }
};

// Sample posts with bilingual content
const samplePosts: Post[] = [
  {
    id: "post1",
    userId: "user2",
    content: "Just harvested the most beautiful organic tomatoes! 🍅 The companion planting with marigolds worked wonders for pest control. Sharing some photos from my farm.",
    contentHindi: "अभी सबसे सुंदर जैविक टमाटर की फसल काटी! 🍅 गेंदे के फूलों के साथ साथी रोपण ने कीट नियंत्रण में अद्भुत काम किया। अपने खेत की कुछ तस्वीरें साझा कर रही हूँ।",
    images: [tomatoesFarm],
    type: 'post',
    likes: 234,
    comments: 45,
    shares: 12,
    bookmarks: 67,
    timestamp: new Date(2025, 3, 16, 9, 30),
    tags: ["OrganicFarming", "Tomatoes", "CompanionPlanting", "जैविककृषि"],
    language: 'en'
  },
  {
    id: "post2", 
    userId: "user1",
    content: "मेरे गेहूं के खेत में इस साल बंपर फसल का अनुमान है! नई तकनीक और जैविक खाद का उपयोग करके बेहतरीन परिणाम मिले हैं। 🌾",
    contentHindi: "मेरे गेहूं के खेत में इस साल बंपर फसल का अनुमान है! नई तकनीक और जैविक खाद का उपयोग करके बेहतरीन परिणाम मिले हैं। 🌾",
    images: [wheatField],
    type: 'post',
    likes: 189,
    comments: 32,
    shares: 28,
    bookmarks: 45,
    timestamp: new Date(2025, 3, 17, 7, 15),
    tags: ["Wheat", "BumperCrop", "गेहूं", "जैविकखाद"],
    language: 'hi'
  },
  {
    id: "post3",
    userId: "user3",
    content: "Smart irrigation system installed! Using IoT sensors to monitor soil moisture and automate watering. This technology is revolutionizing farming efficiency. 💧📱",
    images: [smartIrrigation],
    type: 'blog',
    likes: 312,
    comments: 78,
    shares: 45,
    bookmarks: 123,
    timestamp: new Date(2025, 3, 17, 12, 45),
    tags: ["SmartFarming", "IoT", "Irrigation", "TechInAgriculture"],
    language: 'en'
  }
];

// Language options
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
];

export default function AgriGram() {
  const [currentUser] = useState(users.user1);
  const [posts, setPosts] = useState(samplePosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [postType, setPostType] = useState<'post' | 'blog' | 'tip'>('post');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('feed');
  const [interactions, setInteractions] = useState<Record<string, { liked: boolean; bookmarked: boolean }>>({});
  const [commentModal, setCommentModal] = useState<{ isOpen: boolean; postId: string; }>({ isOpen: false, postId: '' });
  const [shareModal, setShareModal] = useState<{ isOpen: boolean; postId: string; postContent: string; }>({ isOpen: false, postId: '', postContent: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gradient theme classes
  const gradientBg = "bg-gradient-to-br from-green-100 via-yellow-50 to-green-200";
  const cardGradient = "bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 border-0 shadow-lg";
  const buttonGradient = "bg-gradient-to-r from-green-500 to-yellow-400 text-white hover:from-green-600 hover:to-yellow-500";
  const accentText = "text-green-700";

  // Handle post interactions
  const handleInteraction = (postId: string, type: 'like' | 'bookmark') => {
    setInteractions(prev => {
      const current = prev[postId] || { liked: false, bookmarked: false };
      const newState = { ...current, [type === 'like' ? 'liked' : 'bookmarked']: !current[type === 'like' ? 'liked' : 'bookmarked'] };
      
      // Update post counts
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            [type === 'like' ? 'likes' : 'bookmarks']: newState[type === 'like' ? 'liked' : 'bookmarked'] 
              ? post[type === 'like' ? 'likes' : 'bookmarks'] + 1 
              : post[type === 'like' ? 'likes' : 'bookmarks'] - 1
          };
        }
        return post;
      }));
      
      return { ...prev, [postId]: newState };
    });
  };

  // Handle comment modal
  const handleOpenComments = (postId: string) => {
    setCommentModal({ isOpen: true, postId });
  };

  // Handle share modal  
  const handleOpenShare = (postId: string, postContent: string) => {
    setShareModal({ isOpen: true, postId, postContent });
  };

  // Handle share action (increment share count)
  const handleShare = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    }));
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages].slice(0, 4)); // Max 4 images
    }
  };

  // Handle new post
  const handlePost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost: Post = {
      id: `post${Date.now()}`,
      userId: currentUser.id,
      content: newPostContent,
      images: selectedImages.length > 0 ? selectedImages : undefined,
      type: postType,
      likes: 0,
      comments: 0,
      shares: 0,
      bookmarks: 0,
      timestamp: new Date(),
      tags: extractHashtags(newPostContent),
      language: selectedLanguage as 'en' | 'hi' | 'gu' | 'te'
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setSelectedImages([]);
    setPostType('post');
  };

  // Extract hashtags
  const extractHashtags = (content: string) => {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.substring(1)) : [];
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}मिनट पहले`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} घंटे पहले`;
    } else {
      return date.toLocaleDateString('hi-IN');
    }
  };

  // Post component
  const PostCard = ({ post }: { post: Post }) => {
    const user = users[post.userId];
    const interaction = interactions[post.id] || { liked: false, bookmarked: false };
    
    return (
      <Card className="agri-card mb-6 overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br from-green-400 via-yellow-300 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-yellow-200`}>
                {user.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2"> 
                  <p className="font-semibold text-foreground">
                    {selectedLanguage === 'hi' && user.nameHindi ? user.nameHindi : user.name}
                  </p>
                  {user.verified && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      ✓ सत्यापित
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedLanguage === 'hi' && user.roleHindi ? user.roleHindi : user.role} • {formatTimestamp(post.timestamp)}
                </p>
              </div>
            </div>
            <Badge variant={post.type === 'blog' ? 'default' : 'secondary'} className="text-xs">
              {post.type === 'blog' ? '📝 ब्लॉग' : post.type === 'tip' ? '💡 टिप' : '📄 पोस्ट'}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="mb-4">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedLanguage === 'hi' && post.contentHindi ? post.contentHindi : post.content}
            </p>
            
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-accent/10 hover:bg-accent/20 cursor-pointer">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Images */}
            {post.images && post.images.length > 0 && (
              <div className={`mt-4 grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} rounded-xl overflow-hidden`}>
                {post.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt="Post image" 
                    className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Interaction buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => handleInteraction(post.id, 'like')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  interaction.liked 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`h-5 w-5 ${interaction.liked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              
              <button 
                onClick={() => handleOpenComments(post.id)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              
              <button 
                onClick={() => {
                  handleOpenShare(post.id, post.content);
                  handleShare(post.id);
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-secondary px-3 py-2 rounded-lg hover:bg-secondary/10 transition-all"
              >
                <Share2 className="h-5 w-5" />
                <span className="text-sm font-medium">{post.shares}</span>
              </button>
            </div>
            
            <button 
              onClick={() => handleInteraction(post.id, 'bookmark')}
              className={`p-2 rounded-lg transition-all ${
                interaction.bookmarked 
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                  : 'text-muted-foreground hover:text-amber-500 hover:bg-amber-50'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${interaction.bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`min-h-screen relative overflow-hidden`}>
      {/* Blurred agriculture background image */}
      <img 
        src="https://images.unsplash.com/photo-1629561918009-339e516be72f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Agriculture background" 
        className="absolute inset-0 w-full h-full object-cover z-0 blur-xl brightness-90" 
        style={{ pointerEvents: 'none' }}
      />
      <div className={`relative z-10 ${gradientBg} bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,200,0.3)_0%,rgba(100,200,100,0.2)_100%)] min-h-screen`}> 
      {/* Header */}
  <header className={`sticky top-0 z-50 bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 shadow-lg`}>
  <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-yellow-300 drop-shadow-lg" />
                <h1 className="text-2xl font-bold text-yellow-100 font-poppins drop-shadow">कृषि-ग्राम</h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                <Input 
                  placeholder="खोजें..." 
                  className="pl-10 bg-green-100/30 border-green-300 text-green-900 placeholder:text-green-700 focus:bg-yellow-50"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 bg-green-100/30 border-green-300 text-green-900">
                  <Globe className="h-4 w-4 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.nativeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="ghost" size="sm" className="text-yellow-100 hover:bg-yellow-200/20">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{currentUser.avatar}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

  <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className={`${cardGradient} sticky top-24`}>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white font-bold text-2xl">{currentUser.avatar}</span>
                  </div>
                  <h3 className={`font-semibold text-lg ${accentText}`}> 
                    {selectedLanguage === 'hi' && currentUser.nameHindi ? currentUser.nameHindi : currentUser.name}
                  </h3>
                  <p className={`text-green-800 text-sm`}> 
                    {selectedLanguage === 'hi' && currentUser.roleHindi ? currentUser.roleHindi : currentUser.role}
                  </p>
                  <p className="text-green-700 text-xs mt-1 flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {currentUser.location}
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-sm">
                    <div>
                      <span className="font-semibold text-green-700">{currentUser.followers}</span>
                      <span className="text-green-600 ml-1">फॉलोअर्स</span>
                    </div>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  <Button variant="ghost" className={`w-full justify-start gap-3 hover:bg-green-100/60 ${accentText}`}> 
                    <Home className="h-5 w-5" />
                    होम
                  </Button>
                  <Button variant="ghost" className={`w-full justify-start gap-3 hover:bg-green-100/60 ${accentText}`}> 
                    <Users className="h-5 w-5" />
                    नेटवर्क
                  </Button>
                  <Button variant="ghost" className={`w-full justify-start gap-3 hover:bg-green-100/60 ${accentText}`}> 
                    <Crop className="h-5 w-5" />
                    मेरी फसल
                  </Button>
                  <Button variant="ghost" className={`w-full justify-start gap-3 hover:bg-green-100/60 ${accentText}`}> 
                    <TrendingUp className="h-5 w-5" />
                    ट्रेंडिंग
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* New Post Creator */}
            <Card className="mb-6 bg-gradient-to-br from-green-700 via-green-600 to-yellow-500 border-0 shadow-2xl rounded-2xl">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-yellow-300 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-yellow-200">
                    <span className="text-white font-bold">{currentUser.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder={selectedLanguage === 'hi' ? "अपने कृषि अनुभव साझा करें..." : "Share your farming experience..."}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-[100px] resize-none border-0 focus:ring-2 focus:ring-yellow-400 bg-green-100/40 text-green-900 placeholder:text-green-700 rounded-xl shadow-inner"
                    />
                    {/* Selected Images Preview */}
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {selectedImages.map((img, index) => (
                          <div key={index} className="relative">
                            <img src={img} alt="Selected" className="w-full h-24 object-cover rounded-lg border-2 border-green-400 shadow" />
                            <button 
                              onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-green-500 to-yellow-400 text-white hover:from-green-600 hover:to-yellow-500 shadow"
                        >
                          <Camera className="h-4 w-4 mr-1" />
                          फोटो
                        </Button>
                        <Select value={postType} onValueChange={(value: 'post' | 'blog' | 'tip') => setPostType(value)}>
                          <SelectTrigger className="w-24 h-8 bg-green-100/40 border-green-300 text-green-900 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="post">पोस्ट</SelectItem>
                            <SelectItem value="blog">ब्लॉग</SelectItem>
                            <SelectItem value="tip">टिप</SelectItem>
                          </SelectContent>
                        </Select>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                      <Button 
                        onClick={handlePost}
                        disabled={!newPostContent.trim()}
                        className="bg-gradient-to-r from-green-600 to-yellow-400 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:from-green-700 hover:to-yellow-500"
                      >
                        साझा करें
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div>
              {posts.map((post) => (
                <div className={cardGradient} key={post.id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weather Widget */}
            <Card className={cardGradient}>
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sun className="h-5 w-5 text-secondary" />
                  मौसम पूर्वानुमान
                </h3>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Sun className="h-12 w-12 text-secondary" />
                    <div>
                      <p className="text-3xl font-bold text-foreground">28°C</p>
                      <p className="text-sm text-muted-foreground">धूप</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>आर्द्रता: 65%</div>
                    <div>हवा: 12 km/h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className={cardGradient}>
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  ट्रेंडिंग विषय
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { tag: "जैविककृषि", posts: "1,234 पोस्ट" },
                    { tag: "धानकीफसल", posts: "892 पोस्ट" },
                    { tag: "कृषितकनीक", posts: "567 पोस्ट" },
                    { tag: "मिट्टीकीसेहत", posts: "445 पोस्ट" }
                  ].map((trend, index) => (
                    <div key={index} className="flex justify-between items-center py-2 hover:bg-muted/50 rounded-lg px-2 cursor-pointer transition-colors">
                      <div>
                        <p className="font-medium text-primary">#{trend.tag}</p>
                        <p className="text-xs text-muted-foreground">{trend.posts}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card className={cardGradient}>
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-accent" />
                  सुझाए गए कनेक्शन
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.values(users).slice(1, 3).map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 agri-gradient rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{user.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {selectedLanguage === 'hi' && user.nameHindi ? user.nameHindi : user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedLanguage === 'hi' && user.roleHindi ? user.roleHindi : user.role}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        फॉलो करें
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={() => setCommentModal({ isOpen: false, postId: '' })}
        postId={commentModal.postId}
        currentUser={currentUser}
        language={selectedLanguage}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false, postId: '', postContent: '' })}
        postId={shareModal.postId}
        postContent={shareModal.postContent}
        language={selectedLanguage}
      />
      </div>
    </div>
  );
}