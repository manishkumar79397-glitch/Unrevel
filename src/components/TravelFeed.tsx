import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MapPin, Camera } from "lucide-react";
import { useTravelPosts, useLikePost } from "@/hooks/useTravelData";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TravelFeed = () => {
  const { data: posts = [], isLoading } = useTravelPosts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const likeMutation = useLikePost();

  const handleLike = (postId: string, currentLikedStatus: boolean) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    likeMutation.mutate({ postId, isLiked: currentLikedStatus });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-muted rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-muted rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-40 bg-muted rounded-2xl"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-ocean rounded-2xl flex items-center justify-center">
          <Camera className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground mb-6">Be the first to share your travel experience!</p>
        <Button variant="hero" size="lg">
          <Camera className="w-5 h-5 mr-2" />
          Share Your Story
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 border-2 border-ocean/20">
                <AvatarImage src={post.profiles?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-ocean text-white font-semibold">
                  {post.profiles?.display_name?.[0] || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-lg">{post.profiles?.display_name || "Traveler"}</p>
                <p className="text-sm text-muted-foreground">@{post.profiles?.username || "traveler"}</p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4 mr-2 text-ocean" />
                {post.location}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-bold text-xl mb-3 group-hover:text-ocean transition-colors">{post.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{post.content}</p>
            </div>
            
            {/* Display images from media_urls or fallback to image_url */}
            {(post.media_urls && post.media_urls.length > 0) ? (
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={post.media_urls[0]} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : post.image_url && (
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-3 py-1 bg-ocean/10 text-ocean hover:bg-ocean hover:text-white transition-colors">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-muted-foreground hover:text-red-500 ${post.user_has_liked ? 'text-red-500' : ''} transition-colors`}
                  onClick={() => handleLike(post.id, post.user_has_liked)}
                  disabled={likeMutation.isPending}
                >
                  <Heart className={`h-5 w-5 mr-2 ${post.user_has_liked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{post.likes_count || 0}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-ocean transition-colors">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">{post.comments_count}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-ocean transition-colors">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { TravelFeed };