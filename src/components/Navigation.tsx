import { Home, Search, PlusSquare, Heart, User, Map, Users, Play, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'explore', icon: Search, label: 'Explore' },
  { id: 'reels', icon: Play, label: 'Travel Reels' },
  { id: 'map', icon: Map, label: 'Map' },
  { id: 'post', icon: PlusSquare, label: 'Post' },
  { id: 'groups', icon: Users, label: 'Groups' },
  { id: 'notifications', icon: Heart, label: 'Notifications' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function Navigation({ activeTab, onTabChange, notificationCount = 0 }: NavigationProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (tabId: string) => {
    // Require authentication for certain tabs
    if (!user && ['post', 'notifications', 'profile'].includes(tabId)) {
      navigate('/auth');
      return;
    }
    onTabChange(tabId);
  };
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:left-0 lg:top-0 lg:h-full lg:bg-card lg:border-r lg:border-border lg:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            TravelShare
          </h1>
        </div>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const requiresAuth = ['post', 'notifications', 'profile'].includes(item.id);
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "ocean" : "ghost"}
                className={`justify-start w-full ${isActive ? "shadow-button-travel" : ""} ${requiresAuth && !user ? "opacity-60" : ""}`}
                onClick={() => handleTabChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
                {requiresAuth && !user && <span className="ml-auto text-xs">(Login)</span>}
                {item.id === 'notifications' && notificationCount > 0 && user && (
                  <Badge 
                    variant="destructive" 
                    className="ml-auto min-w-[20px] h-5 rounded-full text-xs"
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
              </Button>
            );
          })}
          
          {/* Login/Profile button for mobile/different state */}
          {!user && (
            <Button
              variant="hero"
              className="justify-start w-full mt-4"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="w-5 h-5 mr-3" />
              <span>Sign In</span>
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.slice(0, user ? 5 : 3).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const requiresAuth = ['post', 'notifications', 'profile'].includes(item.id);
            
            if (requiresAuth && !user) return null;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                className={`relative ${isActive ? "text-ocean" : "text-muted-foreground"} hover:text-ocean`}
                onClick={() => handleTabChange(item.id)}
              >
                <Icon className="w-6 h-6" />
                {item.id === 'notifications' && notificationCount > 0 && user && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-xs p-0 flex items-center justify-center"
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Button>
            );
          })}
          
          {/* Show login button for non-authenticated users on mobile */}
          {!user && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-ocean"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-ocean"
                onClick={() => navigate('/auth')}
              >
                <User className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}