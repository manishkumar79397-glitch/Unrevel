import { Heart, MessageCircle, MapPin, Share2, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TravelPostProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  location: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
  timeAgo: string;
}

export function TravelPost({
  author,
  location,
  image,
  caption,
  likes,
  comments,
  isLiked,
  tags,
  timeAgo,
}: TravelPostProps) {
  return (
    <Card className="w-full max-w-lg mx-auto bg-card shadow-card-travel rounded-xl overflow-hidden animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground text-sm">{author.name}</p>
            <div className="flex items-center text-muted-foreground text-xs">
              <MapPin className="w-3 h-3 mr-1 text-ocean" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img
          src={image}
          alt="Travel post"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-card opacity-20" />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`p-0 h-auto ${isLiked ? "text-red-500" : "text-foreground"} hover:text-red-500 transition-colors`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-foreground hover:text-ocean transition-colors">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-foreground hover:text-ocean transition-colors">
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Like Count */}
        <p className="font-semibold text-sm text-foreground mb-2">
          {likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="mb-3">
          <p className="text-sm text-foreground">
            <span className="font-semibold mr-2">{author.username}</span>
            {caption}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-ocean/10 text-ocean hover:bg-ocean/20"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Comments */}
        <Button variant="ghost" className="p-0 h-auto text-muted-foreground text-sm hover:text-foreground">
          View all {comments} comments
        </Button>
      </div>
    </Card>
  );
}