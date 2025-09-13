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
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:h-full lg:bg-card/50 lg:backdrop-blur-xl lg:border-r lg:border-border lg:p-8 lg:shadow-lg">
        <div className="mb-12">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Unravel
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Share your adventures</p>
        </div>
        
        <nav className="flex-1">
          <div className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const requiresAuth = ['post', 'notifications', 'profile'].includes(item.id);
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "ocean" : "ghost"}
                  size="lg"
                  className={`w-full justify-start text-left h-12 ${isActive ? "shadow-lg" : ""} ${requiresAuth && !user ? "opacity-60" : ""}`}
                  onClick={() => handleTabChange(item.id)}
                >
                  <Icon className="w-5 h-5 mr-4" />
                  <span className="text-base">{item.label}</span>
                  {requiresAuth && !user && <span className="ml-auto text-xs">(Login)</span>}
                  {item.id === 'notifications' && notificationCount > 0 && user && (
                    <Badge 
                      variant="destructive" 
                      className="ml-auto min-w-[22px] h-6 rounded-full text-xs"
                    >
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
          
          {/* Login button for desktop */}
          {!user && (
            <div className="mt-8 pt-8 border-t border-border">
              <Button
                variant="hero"
                size="lg"
                className="w-full h-12"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="w-5 h-5 mr-4" />
                <span className="text-base">Sign In</span>
              </Button>
            </div>
          )}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border p-3 z-50 shadow-2xl">
        <div className="flex justify-around items-center max-w-md mx-auto">
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
                className={`relative h-12 w-12 ${isActive ? "text-ocean bg-ocean/10" : "text-muted-foreground"} hover:text-ocean hover:bg-ocean/10`}
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
          
          {/* Show login and profile buttons for non-authenticated users on mobile */}
          {!user && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 text-muted-foreground hover:text-ocean hover:bg-ocean/10"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 text-muted-foreground hover:text-ocean hover:bg-ocean/10"
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