import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useTravelReels } from "@/hooks/useTravelData";

interface ReelData {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  location: string;
  videoThumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
}

const dummyReels: ReelData[] = [
  {
    id: "1",
    author: {
      name: "Priya Sharma",
      username: "wandering_desi",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    location: "Taj Mahal, Agra",
    videoThumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=800&fit=crop",
    caption: "Sunrise at the Taj Mahal is pure magic! ✨ The way the light hits the marble is breathtaking",
    likes: 15420,
    comments: 892,
    shares: 234,
    isLiked: true,
    tags: ["tajmahal", "sunrise", "india", "heritage"]
  },
  {
    id: "2",
    author: {
      name: "Rohan Singh",
      username: "mountain_wanderer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    location: "Ladakh, India",
    videoThumbnail: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=800&fit=crop",
    caption: "Royal Enfield through the highest motorable passes! 🏔️ Living the dream in Ladakh",
    likes: 8934,
    comments: 456,
    shares: 189,
    isLiked: false,
    tags: ["ladakh", "biketrip", "adventure", "mountains"]
  },
  {
    id: "3",
    author: {
      name: "Emma Thompson",
      username: "foodie_explorer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    location: "Tokyo Street Food",
    videoThumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=800&fit=crop",
    caption: "Making fresh ramen in Tokyo! The process is an art form 🍜✨",
    likes: 12567,
    comments: 678,
    shares: 345,
    isLiked: true,
    tags: ["tokyo", "ramen", "streetfood", "cooking"]
  }
];

interface ReelProps {
  reel: ReelData | any;
  isVisible: boolean;
}

function Reel({ reel, isVisible }: ReelProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-[80vh] bg-black rounded-2xl overflow-hidden snap-start">
      {/* Background Video/Image */}
      <img
        src={reel.thumbnail_url || reel.videoThumbnail}
        alt="Travel reel"
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      
      {/* Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            onClick={() => setIsPlaying(true)}
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </Button>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex">
        {/* Left side - User info and caption */}
        <div className="flex-1 flex flex-col justify-end p-4">
          <div className="space-y-3">
            {/* User info */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-white/50">
                <AvatarImage src={reel.profiles?.avatar_url || reel.author?.avatar || "/placeholder.svg"} alt={reel.profiles?.display_name || reel.author?.name || "User"} />
                <AvatarFallback>{(reel.profiles?.display_name || reel.author?.name || "T").charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-white text-sm">{reel.profiles?.username || reel.author?.username || "traveler"}</p>
                <p className="text-white/80 text-xs">{reel.location}</p>
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">{reel.title || reel.caption}</p>
              <div className="flex flex-wrap gap-1">
                {(reel.tags || []).map((tag: string, index: number) => (
                  <span key={index} className="text-white/90 text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex flex-col justify-end items-center p-4 space-y-6">
          {/* Like */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className={`w-12 h-12 rounded-full ${reel.isLiked ? "text-red-500" : "text-white"} hover:bg-white/20`}
            >
              <Heart className={`w-6 h-6 ${reel.isLiked ? "fill-current" : ""}`} />
            </Button>
            <span className="text-white text-xs font-medium">
              {((reel.likes_count || reel.likes) > 1000) ? `${((reel.likes_count || reel.likes) / 1000).toFixed(1)}K` : (reel.likes_count || reel.likes)}
            </span>
          </div>

          {/* Comment */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-white hover:bg-white/20"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <span className="text-white text-xs font-medium">
              {((reel.views_count || reel.comments) > 1000) ? `${((reel.views_count || reel.comments) / 1000).toFixed(1)}K` : (reel.views_count || reel.comments)}
            </span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full text-white hover:bg-white/20"
            >
              <Share2 className="w-6 h-6" />
            </Button>
            <span className="text-white text-xs font-medium">
              {((reel.shares || 0) > 1000) ? `${(reel.shares / 1000).toFixed(1)}K` : (reel.shares || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TravelReels() {
  const { data: reels = [], isLoading } = useTravelReels();

  if (isLoading) {
    return <div className="text-center py-8">Loading reels...</div>;
  }

  const displayReels = reels.length > 0 ? reels : dummyReels;

  return (
    <div className="h-[80vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide space-y-4">
      {displayReels.map((reel, index) => (
        <Reel 
          key={reel.id} 
          reel={reel} 
          isVisible={true}
        />
      ))}
    </div>
  );
}