import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { TravelFeed } from "@/components/TravelFeed";
import { useTravelPosts } from "@/hooks/useTravelData";
import { TravelReels } from "@/components/TravelReels";
import { UserProfile } from "@/components/UserProfile";
import { CreatePost } from "@/components/CreatePost";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Compass, 
  Users, 
  Camera, 
  Plane,
  Mountain,
  Globe,
  Heart,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useTravelData";
import heroImage from "@/assets/travel-hero.jpg";

// Dummy user data
const currentUser = {
  name: "Alex Johnson",
  username: "alex_explorer",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
  bio: "Digital nomad exploring the world one adventure at a time 🌍 | Photography enthusiast | Mountain lover",
  location: "Currently in Bali, Indonesia",
  followers: 2847,
  following: 956,
  posts: 187,
  interests: ["Mountain Hiking", "Photography", "Solo Travel", "Street Food", "Scuba Diving"],
  isOwnProfile: true
};

// Dummy travel groups data
const travelGroups = [
  { name: "Solo Travelers", members: "12.5K", icon: "👤", color: "bg-ocean" },
  { name: "Indian Heritage", members: "6.8K", icon: "🏛️", color: "bg-sunset" },
  { name: "Mountain Hikers", members: "8.3K", icon: "⛰️", color: "bg-nature" },
  { name: "Food Explorers", members: "15.7K", icon: "🍜", color: "bg-sunset" },
  { name: "Spiritual Journey", members: "4.2K", icon: "🕉️", color: "bg-nature" },
  { name: "Photography", members: "9.1K", icon: "📸", color: "bg-ocean" },
  { name: "Beach Lovers", members: "11.2K", icon: "🏖️", color: "bg-sky" }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { user, loading, signOut } = useAuth();
  const { data: userProfile } = useUserProfile();
  const { data: posts = [], refetch } = useTravelPosts();
  const navigate = useNavigate();

  // Show loading state
  if (loading) return <div>Loading...</div>;

  const handleSignOut = async () => {
    await signOut();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-8">
            {/* Hero Section - Only on Home */}
            <div className="relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-xl mb-12 animate-fade-in">
              <img
                src={heroImage}
                alt="Travel the world"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-end">
                <div className="p-8 lg:p-12 text-white max-w-3xl">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-4 animate-fade-in leading-tight">
                    Share Your Adventures
                  </h1>
                  <p className="text-lg lg:text-xl opacity-90 animate-slide-up mb-6 leading-relaxed">
                    Connect with fellow travelers and discover amazing destinations around the world
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="animate-bounce-gentle text-base px-8 py-4 h-auto"
                      onClick={() => user ? setActiveTab('post') : navigate('/auth')}
                    >
                      <Camera className="w-5 h-5 mr-3" />
                      Share Your Story
                    </Button>
                    <Button 
                      variant="ocean-outline" 
                      size="lg" 
                      className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary text-base px-8 py-4 h-auto"
                      onClick={() => setActiveTab('explore')}
                    >
                      <Compass className="w-5 h-5 mr-3" />
                      Explore Places
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Feed */}
            <TravelFeed posts={posts} onShareStory={() => setActiveTab('post')} />
          </div>
        );
      
      case "explore":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Explore Destinations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover amazing places around the world and plan your next adventure</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {["Jaipur, India", "Kerala, India", "Tokyo, Japan", "Goa, India", "Paris, France", "Ladakh, India", "New York, USA", "Bali, Indonesia", "Mumbai, India", "Barcelona, Spain", "Santorini, Greece", "Dubai, UAE"].map((destination, index) => (
                <Card key={destination} className="group p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-ocean rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{destination}</h3>
                  <p className="text-sm text-muted-foreground">Explore this destination</p>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case "reels":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Travel Reels</h2>
            <TravelReels />
          </div>
        );
      
      case "map":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Travel Map</h2>
            <Card className="p-8 text-center min-h-96 flex items-center justify-center">
              <div className="space-y-4">
                <MapPin className="w-16 h-16 mx-auto text-ocean" />
                <h3 className="text-xl font-semibold">Interactive Travel Map</h3>
                <p className="text-muted-foreground">Discover posts and places from around the world</p>
                <Button variant="ocean">Enable Map View</Button>
              </div>
            </Card>
          </div>
        );
      
      case "groups":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Travel Communities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join like-minded travelers and share experiences with communities that match your interests</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {travelGroups.map((group, index) => (
                <Card key={group.name} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${group.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                        {group.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground mb-1">{group.name}</h3>
                        <p className="text-muted-foreground">{group.members} members</p>
                      </div>
                    </div>
                    <Button variant="ocean" size="lg" className="px-6">
                      <Users className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case "post":
        return (
          <div className="space-y-6">
            <CreatePost 
              onPostCreated={() => {
                toast({
                  title: "Post created successfully!",
                  description: "Your travel story has been shared with the community.",
                });
                refetch();
                setActiveTab('home');
              }} 
            />
          </div>
        );
      
      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Notifications</h2>
            <Card className="p-8 text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No new notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </Card>
          </div>
        );
      
        case "profile":
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile</h2>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
              {userProfile && <UserProfile user={{
                name: userProfile.display_name || "Traveler",
                username: userProfile.username || "traveler",
                avatar: userProfile.avatar_url || "/placeholder.svg",
                bio: userProfile.bio || "Travel enthusiast sharing amazing experiences",
                location: userProfile.location || "Exploring the world",
                followers: userProfile.followers_count,
                following: userProfile.following_count,
                posts: userProfile.posts_count,
                interests: userProfile.interests || [],
                isOwnProfile: true,
                isFollowing: false
              }} />}
            </div>
          );
      
      default:
        return <TravelFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        notificationCount={5} 
      />
      
      {/* Main Content */}
      <main className="lg:ml-80 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;