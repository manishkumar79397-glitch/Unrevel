import { Home, Search, PlusSquare, Heart, User, Map, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'explore', icon: Search, label: 'Explore' },
  { id: 'map', icon: Map, label: 'Map' },
  { id: 'post', icon: PlusSquare, label: 'Post' },
  { id: 'groups', icon: Users, label: 'Groups' },
  { id: 'notifications', icon: Heart, label: 'Notifications' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function Navigation({ activeTab, onTabChange, notificationCount = 0 }: NavigationProps) {
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
            return (
              <Button
                key={item.id}
                variant={isActive ? "ocean" : "ghost"}
                className={`justify-start w-full ${isActive ? "shadow-button-travel" : ""}`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
                {item.id === 'notifications' && notificationCount > 0 && (
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
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                className={`relative ${isActive ? "text-ocean" : "text-muted-foreground"} hover:text-ocean`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-6 h-6" />
                {item.id === 'notifications' && notificationCount > 0 && (
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
        </div>
      </nav>
    </>
  );
}