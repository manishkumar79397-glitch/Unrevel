import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { TravelFeed } from "@/components/TravelFeed";
import { UserProfile } from "@/components/UserProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Compass, 
  Users, 
  Camera, 
  Plane,
  Mountain,
  Globe,
  Heart
} from "lucide-react";
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
  { name: "Mountain Hikers", members: "8.3K", icon: "⛰️", color: "bg-nature" },
  { name: "Food Explorers", members: "15.7K", icon: "🍜", color: "bg-sunset" },
  { name: "Photography", members: "9.1K", icon: "📸", color: "bg-ocean" },
  { name: "Beach Lovers", members: "11.2K", icon: "🏖️", color: "bg-sky" }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Hero Section - Only on Home */}
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-travel mb-8">
              <img
                src={heroImage}
                alt="Travel the world"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2 animate-fade-in">
                  Share Your Adventures
                </h1>
                <p className="text-lg opacity-90 animate-slide-up">
                  Connect with fellow travelers and discover amazing destinations
                </p>
                <div className="flex space-x-3 mt-4">
                  <Button variant="hero" size="lg" className="animate-bounce-gentle">
                    <Camera className="w-5 h-5 mr-2" />
                    Share Your Story
                  </Button>
                  <Button variant="ocean-outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white">
                    <Compass className="w-5 h-5 mr-2" />
                    Explore
                  </Button>
                </div>
              </div>
            </div>

            {/* Travel Feed */}
            <TravelFeed />
          </div>
        );
      
      case "explore":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Explore Destinations</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {["Paris, France", "Tokyo, Japan", "New York, USA", "Bali, Indonesia", "London, UK", "Rome, Italy"].map((destination) => (
                <Card key={destination} className="p-4 text-center hover:shadow-card-travel transition-shadow">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-ocean" />
                  <p className="font-medium text-sm">{destination}</p>
                </Card>
              ))}
            </div>
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Travel Communities</h2>
            <div className="space-y-4">
              {travelGroups.map((group, index) => (
                <Card key={group.name} className="p-4 hover:shadow-card-travel transition-shadow animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${group.color} rounded-full flex items-center justify-center text-xl`}>
                        {group.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.members} members</p>
                      </div>
                    </div>
                    <Button variant="ocean-outline" size="sm">
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Create New Post</h2>
            <Card className="p-8 text-center min-h-96 flex items-center justify-center">
              <div className="space-y-4">
                <Camera className="w-16 h-16 mx-auto text-ocean" />
                <h3 className="text-xl font-semibold">Share Your Travel Story</h3>
                <p className="text-muted-foreground">Upload photos and share your amazing adventures</p>
                <Button variant="hero" size="lg">
                  <Plane className="w-5 h-5 mr-2" />
                  Create Post
                </Button>
              </div>
            </Card>
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
        return <UserProfile user={currentUser} />;
      
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
      <main className="lg:ml-64 px-4 py-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;