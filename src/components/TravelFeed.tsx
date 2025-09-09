import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MapPin } from "lucide-react";
import { useTravelPosts, useLikePost } from "@/hooks/useTravelData";
import { useState } from "react";

const TravelFeed = () => {
  const { data: posts = [], isLoading } = useTravelPosts();
  const likeMutation = useLikePost();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    const isLiked = likedPosts.has(postId);
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (isLiked) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
    
    likeMutation.mutate({ postId, isLiked });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (!posts.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts yet. Be the first to share your travel experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={post.profiles?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback>{post.profiles?.display_name?.[0] || "T"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{post.profiles?.display_name || "Traveler"}</p>
                <p className="text-sm text-muted-foreground">@{post.profiles?.username || "traveler"}</p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {post.location}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-muted-foreground">{post.content}</p>
            </div>
            
            {post.image_url && (
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-muted-foreground ${likedPosts.has(post.id) ? 'text-red-500' : 'hover:text-red-500'}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  {post.likes_count}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments_count}
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { TravelFeed };