import { MapPin, Camera, Users, Heart, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserProfileProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location: string;
    followers: number;
    following: number;
    posts: number;
    interests: string[];
    isOwnProfile?: boolean;
    isFollowing?: boolean;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-6 shadow-card-travel animate-fade-in">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <Avatar className="w-24 h-24 border-4 border-ocean/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
            <p className="text-muted-foreground mb-2">@{user.username}</p>
            
            <div className="flex items-center justify-center sm:justify-start text-muted-foreground mb-3">
              <MapPin className="w-4 h-4 mr-1 text-ocean" />
              <span className="text-sm">{user.location}</span>
            </div>
            
            <p className="text-sm text-foreground mb-4">{user.bio}</p>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              {user.isOwnProfile ? (
                <>
                  <Button variant="ocean" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant={user.isFollowing ? "outline" : "ocean"} size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="ocean-outline" size="sm">
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center sm:justify-start space-x-8 mb-6 pb-6 border-b border-border">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{user.posts.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{user.followers.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{user.following.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Travel Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gradient-ocean text-white hover:shadow-button-travel"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}